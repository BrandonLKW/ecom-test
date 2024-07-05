import { Button, Stack, TextField, Typography } from "@mui/material";
import { Product } from "../../../models/Product"

export default function ProductItem(props: any){
    const filePath = "../images/";
    const product = new Product();
    //set static values for testing;
    product.name = "FRUIT";
    product.image = "apple.jpg";
    product.stock_quantity = 100;
    product.unit_price = 5.0;

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
    };

    return (
        <Stack spacing={1}>
            <img src={filePath + product.image}/>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="h6">Unit Price: {product.unit_price}</Typography>
            <Typography variant="h6">Available Quantity {product.stock_quantity}</Typography>
            <TextField label="Added" name="cart" variant="outlined" value={product.stock_quantity} onChange={handleTextChange}/>
            <Button>Update Cart</Button>
            <Button>Restock</Button>
        </Stack>
    );
}