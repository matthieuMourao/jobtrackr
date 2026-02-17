import { NavLink } from "react-router-dom";

export default function Navbar() {
    const linkStyle = ({ isActive }) => ({
        textDecoration: "none",
        fontWeight: isActive ? 700 : 400,
    });

    return (
        <nav style={{display: "flex", gap: 12, alignItems: "center"}}>
            <span style={{fontWeight: 800 }}>JobTrackr</span>

            <NavLink to="/" style={linkStyle}>
                Dashboard
            </NavLink>

            <NavLink to="/login" style={linkStyle}>
                Login
            </NavLink>

            <NavLink to="/signup" style={linkStyle}>
                Signup
            </NavLink>

            <NavLink to="/new" style={linkStyle}>
                New
            </NavLink>
        </nav>
    );
}