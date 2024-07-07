import * as React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import * as orderService from '../../util/order-service';
import * as productService from "../../util/product-service";
import { Alert, AppBar, Box, Button, Dialog, Toolbar, Tooltip, IconButton, Typography, Menu, MenuItem, Container } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginFormModal from "./Modal/LoginFormModal";
import SignUpFormModal from "./Modal/SignUpFormModal";
import CartModal from '../components/Modal/CartModal';
import PaymentModal from '../components/Modal/PaymentModal';
import { Cart } from '../../models/Cart';
import { User } from "../../models/User";
import { Order } from "../../models/Order";
import { OrderItem } from "../../models/OrderItem";

const pages = ['Home', 'Products'];
const adminPages = ['Home', 'Products', 'Orders', 'History'];
const settings = ['Logout'];

type NavBarProps = {
    cartItemList: Cart[];
    setCartItemList: (cartItemList: Cart[]) => void;
    setUser: (user: User) => void;
};

export default function NavBar({ cartItemList, setCartItemList, setUser }: NavBarProps){
    const navigate = useNavigate();
    const user = React.useContext(UserContext);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showLoginModal, setShowLoginModal] = React.useState<boolean>(false);
    const [showSignupModal, setShowSignupModal] = React.useState<boolean>(false);
    const [showCartModal, setShowCartModal] = React.useState<boolean>(false);
    const [showPaymentModal, setShowPaymentModal] = React.useState<boolean>(false);
    const [showError, setShowError] = React.useState<boolean>(false);
    const [errorMsg, setErrorMsg] = React.useState<string>("");
    const [showSuccess, setShowSuccess] = React.useState<boolean>(false);
    const [successMsg, setSuccessMsg] = React.useState<string>("");

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(null);
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

    const resetWarnings = () => {
        setShowModal(false);
        setShowError(false);
        setErrorMsg("");
        setShowSuccess(false);
        setSuccessMsg("");
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
                    setShowModal(true);
                    setShowError(true);
                    setErrorMsg(`Not enough quantity left for ${cartItem.product.name}. Please refresh and choose a different amount.`);
                    return;
                }
                cartItem.product.stock_quantity = quantityCheck[0].stock_quantity;
            } else{
                //db query error
                setShowModal(true);
                setShowError(true);
                setErrorMsg(`Error checking stock for ${cartItem.product.name}. Please refresh and try again.`);
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
                setShowModal(true);
                setShowError(true);
                setErrorMsg(`Error adding order. Please refresh and try again.`);
            }
        }
        trySubmitOrder();
    
        //After successful transaction
        setShowCartModal(false);
        setShowPaymentModal(false);
        setShowModal(true);
        setShowSuccess(true);
        setSuccessMsg("Order successfully placed! The shop will start preparing your delivery.")
    }
    
    return (
        <AppBar>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {adminPages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                {page}
                            </Button>
                        ))}
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
            <Dialog open={showModal}
                    onClose={() => {resetWarnings()}}>
                <Alert severity="success" sx={{display: showSuccess ? "" : "none"}}>{successMsg}</Alert>
                <Alert severity="error" sx={{display: showError ? "" : "none"}}>{errorMsg}</Alert>
            </Dialog>
        </AppBar>
    );
}