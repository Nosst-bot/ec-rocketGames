import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext)!;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState({ type: "", text: "" });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (data.error) {
                setMsg({ type: "danger", text: data.error || "Credenciales inválidas" });
                return;
            }

            login(data.token, data.role);

            localStorage.setItem("email", data.email);
            localStorage.setItem("username", data.username);

            setMsg({ type: "success", text: "Ingresando..." });

            navigate("/");
        } catch (e) {
            setMsg({ type: "danger", text: "Error de conexión" });
        }
    }
    return (
        <div className="container py-5 min-vh-100">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <div className="card shadow-lg rounded-4">
                        <div className="card-body p-4">
                            <h1 className="h4 mb-3 text-center">Iniciar sesión en Rocket Games</h1>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Correo</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="tucorreo@gmail.com"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                    />
                                </div>

                                {msg.text && (
                                    <div className={`alert alert-${msg.type}`}>
                                        {msg.text}
                                    </div>
                                )}

                                <button type="submit" className="btn btn-danger w-100">Ingresar</button>
                            </form>

                            <hr />
                            <p className="text-center">
                                ¿No tienes cuenta? <Link to="/register">Registrarse</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
