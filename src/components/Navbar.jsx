import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
    const { currentUser, logout } = useAuth();

    const linkStyle = ({ isActive }) => ({
        textDecoration: "none",
        fontWeight: isActive ? 700 : 400,
    });

    async function  handleLogout() {
        try {
            await logout();
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
        }
    }

    return (
        <nav style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontWeight: 800 }}>JobTrackr</span>

            <NavLink to="/" style={linkStyle}>
                Dashboard
            </NavLink>

            <NavLink to="/new" style={{linkStyle}}>
                New
            </NavLink>

            {!currentUser ? (
                <>
                    <NavLink to="/login" style={linkStyle}>
                        Login
                    </NavLink>

                    <NavLink to="/signup" style={linkStyle}>
                        Signup
                    </NavLink>
                </>
            ) : (
                <>
                    <span style={{ marginLeft: "auto", opacity: 0.8 }}>
                        {currentUser.email}
                    </span>

                    <button onClick={handleLogout} style={{ padding: "6px 10px", cursor: "pointer" }}>
                        Logout
                    </button>
                </>
            )}
        </nav>
    );
}

