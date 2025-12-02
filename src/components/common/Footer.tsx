export default function Footer() {
    return (
        <footer className="bg-dark text-white mt-5">
            <div className="container py-5">
                <div className="row g-4">
                    {/* Logo y Descripción */}
                    <div className="col-lg-4 col-md-6">
                        <div className="d-flex align-items-center mb-3">
                            <img 
                                src="assets/straw_hat.png" 
                                alt="Rocket Games" 
                                style={{width: "60px", height: "60px", objectFit: "contain"}}
                                className="me-3"
                            />
                            <h3 className="mb-0 fw-bold">Rocket Games</h3>
                        </div>
                        <p className="text-white-50 small">
                            Tu tienda digital de confianza para los mejores videojuegos. 
                            Calidad, rapidez y los mejores precios.
                        </p>
                        <div className="d-flex gap-3 mt-3">
                            <a href="#" className="text-white-50 fs-4"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="text-white-50 fs-4"><i className="bi bi-twitter"></i></a>
                            <a href="#" className="text-white-50 fs-4"><i className="bi bi-instagram"></i></a>
                            <a href="#" className="text-white-50 fs-4"><i className="bi bi-discord"></i></a>
                        </div>
                    </div>

                    {/* Enlaces Rápidos */}
                    <div className="col-lg-2 col-md-6">
                        <h5 className="fw-bold mb-3">Navegación</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><a href="/" className="text-white-50 text-decoration-none">Inicio</a></li>
                            <li className="mb-2"><a href="/about" className="text-white-50 text-decoration-none">Sobre Nosotros</a></li>
                            <li className="mb-2"><a href="/contact" className="text-white-50 text-decoration-none">Contacto</a></li>
                            <li className="mb-2"><a href="/cart" className="text-white-50 text-decoration-none">Carrito</a></li>
                        </ul>
                    </div>

                    {/* Soporte */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="fw-bold mb-3">Soporte</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Preguntas Frecuentes</a></li>
                            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Política de Devolución</a></li>
                            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Términos y Condiciones</a></li>
                            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Privacidad</a></li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="fw-bold mb-3">Contacto</h5>
                        <ul className="list-unstyled text-white-50 small">
                            <li className="mb-2">
                                <i className="bi bi-envelope me-2"></i>
                                support@rocketgames.com
                            </li>
                            <li className="mb-2">
                                <i className="bi bi-telephone me-2"></i>
                                +56 9 1234 5678
                            </li>
                            <li className="mb-2">
                                <i className="bi bi-geo-alt me-2"></i>
                                Santiago, Chile
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-secondary my-4" />

                {/* Bottom Bar */}
                <div className="row align-items-center">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        <p className="text-white-50 small mb-0">
                            © 2025 Rocket Games. Todos los derechos reservados.
                        </p>
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <p className="text-white-50 small mb-0">
                            Desarrollado por{' '}
                            <strong className="text-white">Kevin Salvatierra</strong> y{' '}
                            <strong className="text-white">Fernando Huamanchumo</strong>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}