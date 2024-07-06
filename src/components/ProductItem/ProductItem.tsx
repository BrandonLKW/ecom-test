import { Button, Stack, TextField, Typography } from "@mui/material";
import { Product } from "../../../models/Product"

type ProductItemProps = {
    product: Product;
};

export default function ProductItem({ product } : ProductItemProps){
    const filePath = "../images/";
    
    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
    };

    return (
        <Stack spacing={1}>
            <img height="250" width="250" src={filePath + product.image}/>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="h6">Unit Price: {product.unit_price}</Typography>
            <Typography variant="h6">Available Quantity {product.stock_quantity}</Typography>
            <TextField label="Added" name="cart" variant="outlined" value={product.stock_quantity} onChange={handleTextChange}/>
            <Button>Update Cart</Button>
            <Button>Restock</Button>
        </Stack>
    );
}