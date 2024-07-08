import { Divider, Stack, Typography } from "@mui/material";
import { Cart } from "../../../models/Cart";
import "./CartItem.css";

type CartItemProps = {
    cartItem: Cart;
};


export default function CartItem({ cartItem }: CartItemProps){

    return(
        <Stack className="cartItem"
               direction="row" 
               justifyContent="center"
               alignItems="center"
               divider={<Divider orientation="vertical" flexItem />} 
               spacing={5}>
            <img height="50" width="50" src={cartItem.product.image}/>
            <Typography variant="h6">{cartItem.product.name}</Typography>
            <Typography variant="h6">{cartItem.quantity}</Typography>
            <Typography variant="h6">{`$${cartItem.product.unit_price} each`}</Typography>
            <Typography variant="h6">{`$${cartItem.calculateSum()}`}</Typography>
        </Stack>
    );
}