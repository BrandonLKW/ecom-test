import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import * as orderService from "../../../util/order-service";
import * as productService from "../../../util/product-service";
import { Cart } from "../../../models/Cart";
import { Order } from "../../../models/Order";
import { OrderItem } from "../../../models/OrderItem";
import { Product } from "../../../models/Product";
import MessageModal from "../../components/Modal/MessageModal";
import OrderSidebar from "../../components/SideBar/OrderSideBar";
import { Alert, Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import "./OrdersPage.css";

type OrdersPageProps = {
    setCartItemList: (list: Cart[]) => void;
};

export default function OrdersPage({ setCartItemList }: OrdersPageProps){
    const user = useContext(UserContext);
    const [orderList, setOrderList] = useState<Order[]>([]);
    const [selectedOrderItemList, setSelectedOrderItemList] = useState<OrderItem[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order>(new Order());
    const [message, setMessage] = useState<string>("");
    const [messageType, setMessageType] = useState<string>("");

    useEffect(() => {
        const loadOrderList = async () => {
            const response = await orderService.getOrdersByUserId(user.user_id);
            if (response){
                const result = [];
                for (const item of response){
                    result.push(new Order(item.order_id, item.user_id, item.transaction_date, item.total_cost, item.status));
                }
                setOrderList(result);
            }
        }
        loadOrderList();
        setSelectedOrder(new Order());
        setSelectedOrderItemList([]);
    }, []);

    const loadOrderItemList = async (order: Order) => {
        const response = await orderService.getOrderItemsByOrderId(order.order_id);
        if (response){
            const result = [];
            for (const item of response){
                const orderItem = new OrderItem(item.order_item_id, item.order_id, item.unit_price, item.quantity, item.product_id);
                orderItem.product = new Product(item.product_id, item.product_type, item.name, item.image, item.stock_quantity, item.unit_price);
                result.push(orderItem);
            }
            setSelectedOrderItemList(result);
        }
        setSelectedOrder(order);
    }

    //Replace cartItemList with values taken from Order history
    const copyCart = async () => {
        const newCartItemList = [];
        //Check if available stock
        for (const orderItem of selectedOrderItemList){
            const stockResponse = await productService.getProductStock(orderItem.product_id);
            if (stockResponse){
                if (stockResponse[0].stock_quantity < orderItem.quantity){
                    //If not enough stock, break and stop action
                    setMessageType("ERROR");
                    setMessage(`Not enough stock left for ${orderItem.product.name}. Order was not copied to existing cart.`);
                    return;
                }
            }
            //If available stock, create cart items
            newCartItemList.push(new Cart(user.user_id, orderItem.quantity, orderItem.product));
        }
        setCartItemList(newCartItemList);
        setMessageType("SUCCESS");
        setMessage("Order successfully copied!");
    }

    return (
        <div className="orderspage">
            <div className="orderspagecol1">
                <Typography variant="h4">Order History</Typography>
                <OrderSidebar barList={orderList} buttonOnClick={loadOrderItemList}/>
            </div>
            <div className="orderspagecol2">
                {selectedOrder.order_id !== "0" 
                ? 
                <div>
                    <Typography variant="h3">{`Order #${selectedOrder.order_id}`}</Typography>
                    <List>
                        {selectedOrderItemList.map((orderItem) => (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <img src={orderItem.product.image} height="50px" width="50px"/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={`${orderItem.product.name} - Bought ${orderItem.quantity} units at $${orderItem.unit_price} each.`}/>
                            </ListItem>
                        ))}
                    </List>
                    <div className="orderspageHorizontal">
                        <Button variant="contained" onClick={copyCart}>Order Again!</Button>
                        <Alert severity="warning">This action will replace all existing items in your cart!</Alert>
                    </div>
                </div> 
                : 
                <Typography variant="h2">Select an order!</Typography>
                }
                <MessageModal message={message} messageType={messageType}/>
            </div>
        </div>
    )
}