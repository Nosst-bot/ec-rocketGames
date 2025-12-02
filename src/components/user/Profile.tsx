import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
    const { role, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username"); 

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <div className="card shadow rounded-4">
                        <div className="card-body text-center p-4">

                            <h2 className="mb-3 text-danger fw-bold">Mi Perfil</h2>

                            <div className="mb-3">
                                <strong className="text-secondary">Email:</strong>
                                <div>{email || "desconocido"}</div>
                            </div>

                            <div className="mb-3">
                                <strong className="text-secondary">Nombre de usuario:</strong>
                                <div>{username || "desconocido"}</div>
                            </div>

                            <div className="mb-3">
                                <strong className="text-secondary">Rol:</strong>
                                <div>{role}</div>
                            </div>

                            <hr />

                            <button
                                className="btn btn-dark w-100 mt-3"
                                onClick={handleLogout}
                            >
                                Cerrar sesión
                            </button>

                            <Link to="/" className="btn btn-outline-secondary w-100 mt-3">
                                Volver al inicio
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
