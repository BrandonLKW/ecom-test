import { List, ListItemButton, ListItemText } from "@mui/material";

type SidebarProps = {
    barList: string[];
    buttonOnClick: (productType: string) => void;
};


export default function Sidebar ({ barList, buttonOnClick }: SidebarProps){

    return (
        <List>
            {barList.map((item) => (
                <div>
                    <ListItemButton 
                        onClick={() => buttonOnClick(item)}>
                        <ListItemText primary={item} />
                    </ListItemButton>
                </div>
            ))}
        </List>
    );
}