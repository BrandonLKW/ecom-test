import { useEffect, useState } from "react";
import * as orderService from "../../../util/order-service";
import { Order } from "../../../models/Order";
import { OrderItem } from "../../../models/OrderItem";
import { Product } from "../../../models/Product";
import OrderSidebar from "../../components/SideBar/OrderSideBar";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import "./OrdersPage.css";

export default function OrdersPage(props: any){
    const [orderList, setOrderList] = useState<Order[]>([]);
    const [selectedOrderItemList, setSelectedOrderItemList] = useState<OrderItem[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order>(new Order());

    useEffect(() => {
        const loadOrderList = async () => {
            const response = await orderService.getOrdersByUserId("1");
            if (response){
                const result = [];
                for (const item of response){
                    result.push(new Order(item.order_id, item.user_id, item.transaction_date, item.total_cost, item.status));
                }
                setOrderList(result);
            }
        }
        loadOrderList();
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

    return (
        <div className="orderspage">
            
            <div className="orderspagecol1">
                <OrderSidebar barList={orderList} buttonOnClick={loadOrderItemList}/>
            </div>
            <div className="orderspagecol2">
                <Typography variant="h3">{`Order #${selectedOrder.order_id}`}</Typography>
                <List>
                    {selectedOrderItemList.map((orderItem) => (
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <img src={orderItem.product.image}/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`${orderItem.product.name} --- ${orderItem.quantity}/${orderItem.unit_price} per unit`}/>
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    )
}