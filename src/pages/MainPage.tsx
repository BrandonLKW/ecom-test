import Sidebar from "../components/SideBar/Sidebar"
import ProductItem from "../components/ProductItem/ProductItem";

export default function MainPage(props: any){
    const displaySideBar = true;


if (displaySideBar){
    return (
        <>
            <Sidebar />
            <ProductItem />
        </>
    )
} else{
    return (
        <>
            <h1>HOME PAGE</h1>
        </>
    )
}

    
}