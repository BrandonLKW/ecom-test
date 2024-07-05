import { Button, Collapse, List, ListItemButton, ListItemText, Typography } from "@mui/material";



export default function Sidebar (props: any){
    const barList = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

    return (
        <List>
            {barList.map((item) => (
                <div>
                    <ListItemButton>
                        <ListItemText primary={item} />
                    </ListItemButton>
                </div>
            ))}
        </List>
    );
}