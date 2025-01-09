import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";

function AppLayout() {
    return (
        <>
        <AppHeader/>

        <Outlet/>

        <footer>FOOTER</footer>

        </>
    )
}

export default AppLayout;