import { useEffect, useState } from "react";
import * as productService from "../../../util/product-service";
import Sidebar from "../../components/SideBar/Sidebar"
import ProductItem from "../../components/ProductItem/ProductItem";
import { Product } from "../../../models/Product";
import "./ProductPage.css";

export default function ProductPage(props: any){
    const [productTypeList, setProductTypeList] = useState<string[]>([]);
    const [productList, setProductList] = useState<Product[]>([]);

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

    const loadSelectedProductType = async (productType: string) => {
        if (productType){
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


return (
    <div className="productpage">
        <div className="productpagecol1">
            <Sidebar barList={productTypeList} loadSelectedProductType={loadSelectedProductType}/>
        </div>
        <div className="productpagecol2">
            {productList?.map((product) => (<ProductItem product={product}/>))}
        </div>
    </div>
)
    
}