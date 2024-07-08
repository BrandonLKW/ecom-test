import * as React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import * as orderService from '../../util/order-service';
import * as productService from "../../util/product-service";
import { AppBar, Box, Button, Toolbar, Tooltip, IconButton, Typography, Menu, MenuItem, Container } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginFormModal from "./Modal/LoginFormModal";
import SignUpFormModal from "./Modal/SignUpFormModal";
import CartModal from '../components/Modal/CartModal';
import MessageModal from "./Modal/MessageModal";
import PaymentModal from '../components/Modal/PaymentModal';
import { Cart } from '../../models/Cart';
import { User } from "../../models/User";
import { Order } from "../../models/Order";
import { OrderItem } from "../../models/OrderItem";

const pages = ['Home', 'Products']; //for unlogged users, baseline options
const userPages = ['Orders']; //additional options for logged users
const adminPages = ['Orders', 'History']; //additional options for superusers
const settings = ['Logout'];

type NavBarProps = {
    cartItemList: Cart[];
    setCartItemList: (cartItemList: Cart[]) => void;
    setUser: (user: User) => void;
};

export default function NavBar({ cartItemList, setCartItemList, setUser }: NavBarProps){
    const navigate = useNavigate();
    const user = React.useContext(UserContext);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [showLoginModal, setShowLoginModal] = React.useState<boolean>(false);
    const [showSignupModal, setShowSignupModal] = React.useState<boolean>(false);
    const [showCartModal, setShowCartModal] = React.useState<boolean>(false);
    const [showPaymentModal, setShowPaymentModal] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>("");
    const [messageType, setMessageType] = React.useState<string>("");

    const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        navigatePage(event.currentTarget.outerText);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(null);
        switch (event.currentTarget.outerText.toUpperCase()){
            case "LOGOUT":
                setUser(new User());
                setCartItemList([]);
                break;
            default:
                break;
        }
    };

    const navigatePage = (page: string) => {
        switch (page.toUpperCase()){
            case "HOME":
                navigate("/");
                break;
            case "PRODUCTS":
                navigate("/products");
                break;
            case "ORDERS":
                navigate("/orders");
                break;
            case "HISTORY":
                navigate("/history");
                break;
            default:
                //Do nothing if no link
                break;
        }
    }

    const submitOrder = async () => {
        //Counting sum of items and creating order item objects
        let cartItemSum = 0;
        const orderItemList = [];
        for (const cartItem of cartItemList){
            //Check db to ensure stock quantity is enough
            const quantityCheck = await productService.getProductStock(cartItem.product.product_id);
            //Break and return error if any item is under
            if (quantityCheck){
                if (quantityCheck[0].stock_quantity < cartItem.quantity){
                    setMessageType("ERROR");
                    setMessage(`Not enough quantity left for ${cartItem.product.name}. Please refresh and choose a different amount.`);
                    return;
                }
                cartItem.product.stock_quantity = quantityCheck[0].stock_quantity;
            } else{
                //db query error
                setMessageType("ERROR");
                setMessage(`Error checking stock for ${cartItem.product.name}. Please refresh and try again.`);
                return;
            }
            //Otherwise continue
            cartItemSum += cartItem.calculateSum();
            orderItemList.push(new OrderItem("", "", cartItem.product.unit_price, cartItem.quantity, cartItem.product.product_id));
        }
        //Create order object
        const newOrder = new Order();
        newOrder.user_id = user.user_id;
        newOrder.total_cost = cartItemSum;
        newOrder.status = "PENDING";
        newOrder.orderItemList = orderItemList;
        //Push to db
        const trySubmitOrder = async () => {
            const orderResponse = await orderService.addOrder(newOrder);
            if (orderResponse){
                //Update product stock after successful order
                for (const cartItem of cartItemList){
                    const stockUpdate = await productService.updateProductStock(cartItem.product.product_id, (cartItem.product.stock_quantity - cartItem.quantity));
                    //No error checks for now, assume all successful updates
                }
                setCartItemList([]);
            } else{
                //db query error
                setMessageType("ERROR");
                setMessage(`Error adding order. Please refresh and try again.`);
            }
        }
        trySubmitOrder();
    
        //After successful transaction
        setShowCartModal(false);
        setShowPaymentModal(false);
        setMessageType("SUCCESS");
        setMessage("Order successfully placed! The shop will start preparing your delivery.");
        localStorage.removeItem("ecomtest_cart"); //clear cart cache as well
    }
    
    return (
        <AppBar>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                {page}
                            </Button>
                        ))}
                        {user.account_type === "PUBLIC" ?
                            userPages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                {page}
                            </Button>
                        ))
                        :
                        <></>}
                        {user.account_type === "RESTRICTED" ?
                            adminPages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                {page}
                            </Button>
                        ))
                        :
                        <></>}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="View Cart">
                            <IconButton onClick={() => {setShowCartModal(true)}}>
                                <ShoppingCartIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            {user.user_id === "0" ? 
                            <Button onClick={() => setShowLoginModal(true)} sx={{ my: 2, color: 'white', display: 'block' }}>
                                Login here!
                            </Button> 
                            : 
                            <Button onClick={handleOpenUserMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                {`${user.name}`} 
                            </Button>}
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            <LoginFormModal showModal={showLoginModal} setShowModal={setShowLoginModal} setShowSecModal={setShowSignupModal} setUser={setUser}/>
            <SignUpFormModal showModal={showSignupModal} setShowModal={setShowSignupModal} setShowSecModal={setShowLoginModal} setUser={setUser}/>
            <CartModal showModal={showCartModal} setShowModal={setShowCartModal} setShowPaymentModal={setShowPaymentModal} cartItemList={cartItemList} />
            <PaymentModal showModal={showPaymentModal} setShowModal={setShowPaymentModal} submitOrder={submitOrder}/>
            <MessageModal message={message} messageType={messageType} setMessageType={setMessageType}/>
        </AppBar>
    );
}