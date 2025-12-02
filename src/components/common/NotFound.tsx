import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="container text-center py-5">
            <h1 className="display-4 fw-bold text-danger">404</h1>
            <p className="lead mb-4">La página que buscas no existe.</p>

            <div className="d-flex flex-column text-center align-items-center">
                <img
                    src="/assets/luffySad.avif"
                    alt="Not Found"
                    style={{ maxWidth: "480px" }}
                    className="img-fluid mb-4 rounded-5"
                />

                <Link to="/" className="btn btn-dark">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}
