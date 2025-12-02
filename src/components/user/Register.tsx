import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [pass, setPass] = useState("");
    const [msg, setMsg] = useState({ type: "", text: "" });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: nombre,
                    email: correo,
                    password: pass
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setMsg({ type: "danger", text: data.error || "Error al registrarse" });
                return;
            }

            setMsg({ type: "success", text: "Registro exitoso. Redirigiendo..." });

            setTimeout(() => navigate("/login"), 1500);

        } catch (err) {
            setMsg({ type: "danger", text: "Error de conexión" });
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="h4 mb-3 text-center">
                                <span className="text-warning">Rocket Games</span>
                            </h1>

                            <form onSubmit={handleRegister}>

                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        className="form-control"
                                        maxLength={50}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Correo</label>
                                    <input
                                        type="email"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        className="form-control"
                                        maxLength={50}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        value={pass}
                                        onChange={(e) => setPass(e.target.value)}
                                        className="form-control"
                                        minLength={6}
                                        required
                                    />
                                </div>

                                {msg.text && (
                                    <div className={`alert alert-${msg.type}`}>
                                        {msg.text}
                                    </div>
                                )}

                                <button type="submit" className="btn btn-danger w-100">
                                    Registrarme
                                </button>
                            </form>

                            <hr />
                            <p className="text-center">
                                <Link to="/login">Volver al login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
