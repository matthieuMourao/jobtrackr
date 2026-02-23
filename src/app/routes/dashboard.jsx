import { useApplications } from "../../context/ApplicationContext.jsx";

export default function Dashboard() {
    const { applications } = useApplications();

    return (
        <div>
            <h1>Dashboard</h1>

            { applications.length === 0 ? (
                <p>Aucune candidature pour le moment.</p>
            ) : (
                <ul>
                    {applications.map((app) => (
                        <li key={app.id}>
                            <strong>{app.company}</strong> - {app.role} ({app.status})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}