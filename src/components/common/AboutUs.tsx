export default function AboutUs() {
    return (
        <div className="container py-5 min-vh-100">
            {/* Hero Section */}
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold mb-3">Sobre Nosotros</h1>
                <p className="lead text-muted">Tu destino para los mejores videojuegos</p>
            </div>

            {/* Main Content */}
            <div className="row g-4 align-items-center mb-5">
                <div className="col-lg-6">
                    <div className="card border-0 shadow-lg h-100" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                        <div className="card-body p-5 text-white">
                            <h2 className="mb-4">🚀 Nuestra Misión</h2>
                            <p className="lead mb-0">
                                Rocket Games es una tienda digital dedicada a ofrecer los mejores videojuegos 
                                para todas las plataformas. Nuestro objetivo es brindar una experiencia fácil, 
                                rápida y segura para que puedas disfrutar tus juegos favoritos al mejor precio.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="card border-0 shadow-lg h-100">
                        <div className="card-body p-5">
                            <h2 className="mb-4">👥 Nuestro Equipo</h2>
                            <p className="mb-4">
                                Fundada por <strong>Kevin Salvatierra</strong> y <strong>Fernando Huamanchumo</strong>, 
                                somos apasionados por los videojuegos y la tecnología.
                            </p>
                            <p className="text-muted mb-0">
                                ¡Gracias por confiar en nosotros y formar parte de la comunidad Rocket Games! 🎮
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="row g-4 text-center">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">
                            <div className="display-4 mb-3">🎮</div>
                            <h3 className="h5 fw-bold">Variedad</h3>
                            <p className="text-muted small mb-0">Catálogo completo para todas las plataformas</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">
                            <div className="display-4 mb-3">⚡</div>
                            <h3 className="h5 fw-bold">Rapidez</h3>
                            <p className="text-muted small mb-0">Entrega digital instantánea y segura</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">
                            <div className="display-4 mb-3">💰</div>
                            <h3 className="h5 fw-bold">Mejores Precios</h3>
                            <p className="text-muted small mb-0">Ofertas competitivas todo el año</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}