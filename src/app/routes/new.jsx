import { useState } from "react";
import { useApplications } from "../../context/ApplicationContext.jsx";

const STATUS_OPTIONS = ["APPLIED", "INTERVIEW", "REJECTED", "OFFER"];

export default function New() {
    const { addApplication } = useApplications();
    
    const [form, setForm] = useState({
        company:"",
        role:"",
        location:"Montréal",
        status:"APPLIED",
        applieDate:"",
        link:"",
        notes:"",
    });

    const [submitted,setSubmitted] = useState(null);
    const [error,setError] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!form.company.trim() || !form.role.trim()) {
            setError("company et Role sont obligatoires.");
            return;
        }
    

        // on simule une "création" (plus tard ce sera Firebase)

        const newAplication = {
            ...form,
            id: crypto.randomUUID(),
            createAt: new Date().toISOString(),
        };

        addApplication(newAplication);
        setSubmitted(newAplication);

        setForm((prev) => ({
            ...prev,
            company:"",
            role:"",
            link:"",
            notes:"",
        }));
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
                        name="applieDate"
                        value={form.applieDate}
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

            {submitted && (
                <div style={{ marginTop: 24 }}>
                    <h2>Dernière candidature ajoutée (simulation)</h2>
                    <pre style={{ padding: 12, border: "1px solid", msOverflowX: "auto" }}>
                        {JSON.stringify(submitted, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}