import { Button, Stack, TextField, Typography } from "@mui/material";
import { Cart } from "../../../models/Cart";

type CartItemProps = {
    cartItem: Cart;
};


export default function CartItem({ cartItem }: CartItemProps){

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
    };

    return(
        <Stack direction="row" spacing={1}>
            <img height="50" width="50" src={cartItem.product.image}/>
            <Typography variant="h6">{cartItem.product.name}</Typography>
            <TextField label="Selected Quantity" name="cart" variant="outlined" value={cartItem.quantity} onChange={handleTextChange}/>
            <Typography variant="h6">@ {cartItem.product.unit_price} each</Typography>
            <Typography variant="h6">{cartItem.calculateSum()}</Typography>
        </Stack>
    );
}