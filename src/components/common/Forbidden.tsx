import { Link } from "react-router-dom";

export default function Forbidden() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center p-4">

            <h1 className="display-4 fw-bold text-danger mb-3">
                403 • Acceso Denegado
            </h1>

            <p className="lead mb-4" style={{ maxWidth: "450px" }}>
                No tienes permisos para ingresar a esta sección.
                Si crees que esto es un error, contacta con un administrador.
            </p>

            <Link to="/" className="btn btn-dark px-4 py-2">
                Volver al inicio
            </Link>
        </div>
    );
}
