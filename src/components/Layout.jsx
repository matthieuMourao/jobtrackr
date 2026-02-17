import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";

export default function Layout() {
    return (
        <div style={{fontFamily: "system-ui",maxWidth: 900, margin: "o auto",padding: 16}}>
            <Navbar/>
            <main style={{marginTop: 16}}>
                <Outlet />
            </main>
        </div>
    );
}