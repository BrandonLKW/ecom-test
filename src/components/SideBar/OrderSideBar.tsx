import { List, ListItemButton, ListItemText } from "@mui/material";
import { Order } from "../../../models/Order";
import "./Sidebar.css";

type OrderSidebarProps = {
    barList: Order[];
    buttonOnClick: (order: Order) => void;
};


export default function OrderSidebar ({ barList, buttonOnClick }: OrderSidebarProps){

    return (
        <List>
            {barList.map((item) => (
                <div>
                    <ListItemButton 
                        className="sidebaritem"
                        onClick={() => buttonOnClick(item)}>
                        <ListItemText primary={`Order #${item.order_id}`} />
                    </ListItemButton>
                </div>
            ))}
        </List>
    );
}