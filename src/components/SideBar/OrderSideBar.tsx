import { List, ListItemButton, ListItemText } from "@mui/material";
import { Order } from "../../../models/Order";
import "./Sidebar.css";

type OrderSidebarProps = {
    barList: Order[];
    buttonOnClick: (order: Order) => void;
};


export default function OrderSidebar ({ barList, buttonOnClick }: OrderSidebarProps){

    return (
        <List className="sidebarlist">
            {barList.map((item) => (
                <div>
                    <ListItemButton 
                        className="sidebaritem"
                        onClick={() => buttonOnClick(item)}>
                        <ListItemText className="sidebarlistitem" primary={`Order #${item.order_id}`} />
                    </ListItemButton>
                </div>
            ))}
        </List>
    );
}