import { useEffect, useState } from "react";
import { Alert, Dialog, Typography } from "@mui/material";
import * as productService from "../../../util/product-service";
import Sidebar from "../../components/SideBar/Sidebar"
import ProductItem from "../../components/ProductItem/ProductItem";
import { Product } from "../../../models/Product";
import "./ProductPage.css";
import { Cart } from "../../../models/Cart";

type ProductPageProps = {
    cartItemList: Cart[];
    setCartItemList: (list: Cart[]) => void;
};

export default function ProductPage({ cartItemList, setCartItemList }: ProductPageProps){
    const [productTypeList, setProductTypeList] = useState<string[]>([]);
    const [selectedProductType, setSelectedProductType] = useState<string>("");
    const [productList, setProductList] = useState<Product[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showAddSuccess, setShowAddSuccess] = useState<boolean>(false);
    const [showAddError, setShowAddError] = useState<boolean>(false);

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
        clearAlerts();
        setShowModal(true);
        //Check quantity
        if (quantity <= 0){
            setShowAddError(true);
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
        setShowAddSuccess(true);
    };

    const checkSelectedQuantity = (product: Product) => {
        for (const cartItem of cartItemList){
            if (cartItem.product.product_id === product.product_id){
                return cartItem.quantity;
            }
        }
        return 0;
    };

    const clearAlerts = () => {
        setShowModal(false);
        setShowAddSuccess(false);
        setShowAddError(false);
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
            <Dialog open={showModal}
                    onClose={() => {setShowModal(false)}}>
                <Alert severity="success" sx={{display: showAddSuccess ? "" : "none"}}>Product successfully added to Cart!</Alert>
                <Alert severity="error" sx={{display: showAddError ? "" : "none"}}>Unable to add product to Cart, please enter the quantity first.</Alert>
            </Dialog>
        </div>
    )
    
}