import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { creatApplication } from "../../services/applications.js";

const STATUS_OPTIONS = ["APPLIED", "INTERVIEW", "REJECTED", "OFFER"];

export default function New() {
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        company:"",
        role:"",
        location:"Montréal",
        status:"APPLIED",
        appliedDate:"",
        link:"",
        notes:"",
    });

    const [error,setError] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!form.company.trim() || !form.role.trim()) {
            setError("company et Role sont obligatoires.");
            return;
        }

        try {
            await creatApplication(form);
            navigate("/");
        } catch (err) {
            setError("Erreur lors de l'enregistrement dans Firestore.");
            console.error(err);
        }
    }

    return (
        <div>
            <h1>Nouvelle candidature</h1>

            {error && (
                <div style={{ padding: 12, border: "1px solid red", marginBottom: 12 }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 520}}>
                <label>
                    Entreprise *
                    <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="shopify"
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
                    />
                </label>

                <label>
                    Poste *
                    <input
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        placeholder="Développeur Front-End Junior"
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
                    />
                </label>

                <label>
                    Localisation 
                    <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
                    />
                </label>

                <label>
                    Statut 
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
                    >
                        {STATUS_OPTIONS.map((s) =>(
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Date de candidature 
                    <input
                        type="date"
                        name="appliedDate"
                        value={form.appliedDate}
                        onChange={handleChange}
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
                    />
                </label>

                <label>
                    Lien vers l'offre
                    <input
                        name="link"
                        value={form.link}
                        onChange={handleChange}
                        placeholder="https://..."
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
                    />
                </label>

                <label>
                    Notes
                    <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        rows={4}
                        style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
                    />
                </label>

                <button type="submit" style={{ padding: 10, cursor: "pointer" }}>
                    Ajouter
                </button>
            </form>
        </div>
    );
}