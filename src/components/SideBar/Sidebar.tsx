import { useEffect, useState } from "react";
import { Button, Collapse, List, ListItemButton, ListItemText, Typography } from "@mui/material";

type SidebarProps = {
    barList: string[];
    loadSelectedProductType: (productType: string) => void;
};


export default function Sidebar ({ barList, loadSelectedProductType }: SidebarProps){

    return (
        <List>
            {barList.map((item) => (
                <div>
                    <ListItemButton 
                        onClick={() => loadSelectedProductType(item)}>
                        <ListItemText primary={item} />
                    </ListItemButton>
                </div>
            ))}
        </List>
    );
}