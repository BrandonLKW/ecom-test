import * as React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import * as orderService from '../../util/order-service';
import { AppBar, Box, Button, Toolbar, Tooltip, IconButton, Typography, Menu, MenuItem, Container } from "@mui/material"
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
    setUser: (user: User) => void;
};

export default function NavBar({ cartItemList, setUser }: NavBarProps){
    const navigate = useNavigate();
    const user = React.useContext(UserContext);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [showLoginModal, setShowLoginModal] = React.useState<boolean>(false);
    const [showSignupModal, setShowSignupModal] = React.useState<boolean>(false);
    const [showCartModal, setShowCartModal] = React.useState<boolean>(false);
    const [showPaymentModal, setShowPaymentModal] = React.useState<boolean>(false);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(null);
        navigatePage(event.currentTarget.outerText);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        console.log(user);
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

    const submitOrder = () => {
        //Counting sum of items and creating order item objects
        let cartItemSum = 0;
        const orderItemList = [];
        for (const cartItem of cartItemList){
          cartItemSum += cartItem.calculateSum();
          orderItemList.push(new OrderItem("", "", cartItem.product.unit_price, cartItem.quantity, cartItem.product.product_id));
        }
        //Create order object
        const newOrder = new Order();
        newOrder.user_id = "1";
        newOrder.total_cost = cartItemSum;
        newOrder.status = "PENDING";
        newOrder.orderItemList = orderItemList;
    
        //Push to db
        const trySubmitOrder = async () => {
          const response = await orderService.addOrder(newOrder);
        }
        trySubmitOrder();
    
        //Clear after successful transaction
        setShowCartModal(false);
        setShowPaymentModal(false);
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
        </AppBar>
    );
}