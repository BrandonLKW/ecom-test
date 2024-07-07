import { List, ListItemButton, ListItemText } from "@mui/material";
import "./Sidebar.css";

type SidebarProps = {
    barList: string[];
    buttonOnClick: (productType: string) => void;
};


export default function Sidebar ({ barList, buttonOnClick }: SidebarProps){

    return (
        <List className="sidebarlist">
            {barList.map((item) => (
                <div>
                    <ListItemButton 
                        className="sidebaritem"
                        onClick={() => buttonOnClick(item)}>
                        <ListItemText primary={item} />
                    </ListItemButton>
                </div>
            ))}
        </List>
    );
}