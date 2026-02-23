import { useApplications } from "../../context/ApplicationContext.jsx";
import { useMemo, useState } from "react";

const STATUS_OPTIONS = ["ALL", "APPLIED", "INTERVIEW", "REJECTED", "OFFER" ];
const SORT_OPTIONS = ["CREATED_DESC", "CREATED_ASC", "COMPANY_ASC"];

export default function Dashboard() {
    const { applications, removeApplication, updateStatus } = useApplications();

    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [sortBy, setSortBy] = useState("CREATED_DESC");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();

        let list = [...applications];

        // filtre par texte (entreprise + poste)
        if (q) {
            list = list.filter((a) => {
                const company = (a.company || "").toLowerCase();
                const role = (a.role || "").toLowerCase();
                return company.includes(q) || role.includes(q);
            });
        }

        // flitre par statut
        if (statusFilter !=="ALL") {
            list = list.filter((a) => a.status === statusFilter);
        }

        //tri
        if (sortBy === "CREATED_DESC") {
            list.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
        }
        if (sortBy === "CREATED_ASC") {
            list.sort((a, b) => (a.createdAt || "").localeCompare(b.createdAt || ""));
        }
        if (sortBy === "COMPANY_ASC") {
            list.sort((a, b) => (a.company || "").localeCompare(b.company || ""));
        }

        return list;       
    }, [applications, query, statusFilter, sortBy]);

    return (
        <div>
            <h1>Dashboard</h1>
            <div style={{display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12}}>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher (entreprise ou poste)"
                    style={{padding: 8,minWidth: 240}}
                />

                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{padding: 8 }}>
                    {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>

                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{padding: 8 }}>
                    <option value="CREATED_DESC">Plus récentes</option>
                    <option value="CREATED_ASC">Plus anciennes</option>
                    <option value="COMPANY_ASC">Entreprises (A→Z)</option>
                </select>

                <div style={{alignSelf: "center", opacity: 0.8 }}>
                    Résultats : <strong>{filtered.length}</strong>
                </div>
            </div>

            {applications.length === 0 ? (
                <p style={{marginTop: 12 }}>
                    Aucune candidature pour le moment. Vas sur "New" pour en ajouter une.
                </p>
            ) : filtered.length === 0 ? (
                <p style={{marginTop: 12 }}>
                    Aucun résultat avec ces filtres.
                </p>
            ) : (
                <div style={{display: "grid", gap: 12, marginTop: 12 }}>
                    {filtered.map((app) => (
                        <div
                            key={app.id}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: 8,
                                padding: 12,
                            }}
                        >
                            <div style={{display: "flex", justifyContent: "space-between", gap: 12 }}>
                                <div>
                                    <div style={{fontWeight: 700 }}>{app.company}</div>
                                    <div style={{opacity: 0.85 }}>{app.role}</div>
                                    <div style={{fontSize: 12, opacity: 0.7 }}>
                                        {app.location} • {app.applieDate || "Date inconnue"}                    
                                    </div>
                                </div>

                                <div style={{display: "flex", gap: 8, alignItems: "center" }}>
                                    <select
                                        value={app.status}
                                        onChange={(e) => updateStatus(app.id, e.target.value)}
                                        style={{ padding: 6 }}
                                    >
                                        {STATUS_OPTIONS.filter((s) => s !=="ALL").map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>

                                    <button
                                        onClick={() => removeApplication(app.id)}
                                        style={{padding: "6px 10px", cursor: "pointer" }}
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>

                            {app.link && (
                                <p style={{marginTop: 8}}>
                                    <a href={app.link} target="_blank" rel="noreferrer">
                                        Voir l'offre
                                    </a>
                                </p>
                            )}

                            {app.notes && (
                                <p style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>{app.notes}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}