export default function UnauthorizedPage() {
    return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            <h1>Access Denied</h1>
            <p>You do not have permission to view this page.</p>
            <a href="/login" style={{ color: "blue", textDecoration: "underline" }}>
                Go to Login
            </a>
        </div>
    );
}
