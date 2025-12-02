export default function Contact() {
    return (
        <div className="container py-5 min-vh-100">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    {/* Header */}
                    <div className="text-center mb-5">
                        <h1 className="display-4 fw-bold mb-3">Contáctanos</h1>
                        <p className="lead text-muted">¿Tienes alguna pregunta? Estamos aquí para ayudarte</p>
                    </div>

                    {/* Contact Form Card */}
                    <div className="card border-0 shadow-lg">
                        <div className="card-body p-5">
                            <form id="contactForm">
                                <div className="mb-4">
                                    <label htmlFor="nombre" className="form-label fw-semibold">
                                        Nombre completo
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="nombre"
                                        placeholder="Ej: Juan Pérez"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label fw-semibold">
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        id="email"
                                        placeholder="ejemplo@correo.com"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="mensaje" className="form-label fw-semibold">
                                        Mensaje
                                    </label>
                                    <textarea
                                        className="form-control form-control-lg"
                                        id="mensaje"
                                        rows={5}
                                        placeholder="Cuéntanos en qué podemos ayudarte..."
                                        required
                                    ></textarea>
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        Enviar mensaje 📧
                                    </button>
                                </div>
                            </form>

                            <div id="contactSuccess" className="alert alert-success mt-4 d-none" role="alert">
                                <strong>¡Mensaje enviado!</strong> Te responderemos pronto.
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="row g-3 mt-4">
                        <div className="col-md-4 text-center">
                            <div className="p-3">
                                <div className="fs-1 mb-2">📧</div>
                                <p className="small text-muted mb-0">support@rocketgames.com</p>
                            </div>
                        </div>
                        <div className="col-md-4 text-center">
                            <div className="p-3">
                                <div className="fs-1 mb-2">💬</div>
                                <p className="small text-muted mb-0">Chat en vivo disponible</p>
                            </div>
                        </div>
                        <div className="col-md-4 text-center">
                            <div className="p-3">
                                <div className="fs-1 mb-2">⏰</div>
                                <p className="small text-muted mb-0">Lun - Vie: 9AM - 6PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}