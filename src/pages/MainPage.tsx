import Sidebar from "../components/SideBar/Sidebar"

export default function MainPage(props: any){
    const displaySideBar = true;


if (displaySideBar){
    return (
        <>
            <Sidebar />
            <h1>HOME PAGE</h1>
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