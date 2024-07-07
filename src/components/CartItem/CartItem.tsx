import { Divider, Stack, TextField, Typography } from "@mui/material";
import { Cart } from "../../../models/Cart";
import "./CartItem.css";

type CartItemProps = {
    cartItem: Cart;
};


export default function CartItem({ cartItem }: CartItemProps){

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
    };

    return(
        <Stack className="cartItem"
               direction="row" 
               justifyContent="space-between"
               alignItems="center" 
               divider={<Divider orientation="vertical" flexItem />} 
               spacing={1}>
            <img height="50" width="50" src={cartItem.product.image}/>
            <Typography variant="h6">{cartItem.product.name}</Typography>
            <TextField label="Selected Quantity" name="cart" variant="outlined" type="number" value={cartItem.quantity} onChange={handleTextChange}/>
            <Typography variant="h6">{`$${cartItem.product.unit_price} each`}</Typography>
            <Typography variant="h6">{`$${cartItem.calculateSum()}`}</Typography>
        </Stack>
    );
}