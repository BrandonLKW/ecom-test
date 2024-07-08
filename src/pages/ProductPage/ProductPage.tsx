import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import * as productService from "../../../util/product-service";
import Sidebar from "../../components/SideBar/Sidebar"
import ProductItem from "../../components/ProductItem/ProductItem";
import { Product } from "../../../models/Product";
import "./ProductPage.css";
import { Cart } from "../../../models/Cart";
import MessageModal from "../../components/Modal/MessageModal";

type ProductPageProps = {
    cartItemList: Cart[];
    setCartItemList: (list: Cart[]) => void;
};

export default function ProductPage({ cartItemList, setCartItemList }: ProductPageProps){
    const [productTypeList, setProductTypeList] = useState<string[]>([]);
    const [selectedProductType, setSelectedProductType] = useState<string>("");
    const [productList, setProductList] = useState<Product[]>([]);
    const [message, setMessage] = useState<string>("");
    const [messageType, setMessageType] = useState<string>("");

    useEffect(() => {
        const loadProductTypeList = async () => {
            const response = await productService.getAllProductTypes();
            if (response){
                const result = [];
                for (const item of response){
                    result.push(item.product_type);
                }
                setProductTypeList(result);
            }
        }
        loadProductTypeList();
    }, []);

    useEffect(() => {
        const reloadProducts = async () => {
            if (cartItemList.length === 0 && selectedProductType){
                await loadSelectedProductType(selectedProductType);
            }
        }
        reloadProducts();
    }, [cartItemList]);

    const loadSelectedProductType = async (productType: string) => {
        if (productType){
            setSelectedProductType(productType);
            const response = await productService.getAllProductByType(productType);
            if (response){
                const result = [];
                for (const item of response){
                    result.push(new Product(item.product_id, item.product_type, item.name, item.image, item.stock_quantity, item.unit_price));
                }
                setProductList(result);
            }
        }
    };

    const addProductToCart = (product: Product, quantity: number) => {
        //Check quantity
        if (quantity <= 0){
            setMessage("Unable to add product to Cart, please enter the quantity first.");
            setMessageType("ERROR");
            return;
        }
        if (quantity > product.stock_quantity){
            setMessage("Unable to add product to Cart, selected quantity is more than we have in stock!");
            setMessageType("ERROR");
            return;
        }
        //Check if Cart has product, if yes then just update quantity.
        let hasItem = false;
        const updatedList = cartItemList.map((cartItem) => {
            if (cartItem.product.product_id === product.product_id){
                cartItem.quantity = quantity;
                hasItem = true;
            }
            return cartItem;
        });
        //If not, add it
        if (!hasItem){
            const newCartItem = new Cart("0", quantity, product);
            updatedList.push(newCartItem);
        }
        setCartItemList(updatedList);
        setMessage("Product successfully added to Cart!");
        setMessageType("SUCCESS");
    };

    const checkSelectedQuantity = (product: Product) => {
        for (const cartItem of cartItemList){
            if (cartItem.product.product_id === product.product_id){
                return cartItem.quantity;
            }
        }
        return 0;
    };

    return (
        <div className="productpage">
            <div className="productpagecol1">
                <Typography variant="h5">Available Products</Typography>
                <Sidebar barList={productTypeList} buttonOnClick={loadSelectedProductType}/>
            </div>
            <div className="productpagecol2">
                {productList?.map((product) => (<ProductItem product={product} addProductToCart={addProductToCart} selectedQuantity={checkSelectedQuantity(product)}/>))}
            </div>
            <MessageModal message={message} messageType={messageType} setMessageType={setMessageType}/>
        </div>
    )
    
}