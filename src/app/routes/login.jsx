import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Login () {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(form.email, form.password);
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Email ou mot de passe incorrect");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Connexion</h1>

            {error && (
                <div style={{ padding: 12, border: "1px solid", marginBottom: 12 }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 400 }}>
                <label>
                    Email
                    <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@exemple.com"
                    style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
                    />
                </label>

                <label>
                    Mot de passe
                    <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="*******"
                    style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
                    />
                </label>

                <button type="submit" disabled={loading} style={{ padding: 10, cursor: "pointer" }}> 
                    {loading ? "Connexion..." : "Se connecter"}
                </button>
            </form>
        </div>
    );
}