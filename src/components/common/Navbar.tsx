import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
    const { isLogged, role } = useContext(AuthContext);
    const { getCartCount } = useCart();
    const cartCount = getCartCount();


    return (
        <>
            <nav className="navbar navbar-expand-lg fs-5 bg-white sticky-top shadow-lg">
                <div className="container px-4">
                    <Link className="navbar-brand d-flex align-items-center text-white fw-bold" to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" id="brandLogo"
                            className="bi bi-rocket-takeoff-fill" viewBox="0 0 16 16">
                            <path
                                d="M12.17 9.53c2.307-2.592 3.278-4.684 3.641-6.218.21-.887.214-1.58.16-2.065a3.6 3.6 0 0 0-.108-.563 2 2 0 0 0-.078-.23V.453c-.073-.164-.168-.234-.352-.295a2 2 0 0 0-.16-.045 4 4 0 0 0-.57-.093c-.49-.044-1.19-.03-2.08.188-1.536.374-3.618 1.343-6.161 3.604l-2.4.238h-.006a2.55 2.55 0 0 0-1.524.734L.15 7.17a.512.512 0 0 0 .433.868l1.896-.271c.28-.04.592.013.955.132.232.076.437.16.655.248l.203.083c.196.816.66 1.58 1.275 2.195.613.614 1.376 1.08 2.191 1.277l.082.202c.089.218.173.424.249.657.118.363.172.676.132.956l-.271 1.9a.512.512 0 0 0 .867.433l2.382-2.386c.41-.41.668-.949.732-1.526zm.11-3.699c-.797.8-1.93.961-2.528.362-.598-.6-.436-1.733.361-2.532.798-.799 1.93-.96 2.528-.361s.437 1.732-.36 2.531Z" />
                            <path
                                d="M5.205 10.787a7.6 7.6 0 0 0 1.804 1.352c-1.118 1.007-4.929 2.028-5.054 1.903-.126-.127.737-4.189 1.839-5.18.346.69.837 1.35 1.411 1.925" />
                        </svg>
                        <span className="ms-3 text-capitalize fs-4 text-black">
                            Rocket<span className="text-warning m-0">Games
                            </span>
                        </span>
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
                            <li className="nav-item">
                                <Link className="nav-link nav-modern" aria-current="page" to="/">Inicio</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle nav-modern" href="#" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Categorías
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#"><img src="assets/steam.svg" alt="PC" width="20"
                                        className="me-2" />PC</a></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><a className="dropdown-item" href="#"><img src="assets/playstation.svg" alt="Playstation"
                                        width="20" className="me-2" />Playstation</a></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><a className="dropdown-item" href="#"><img src="assets/xbox.svg" alt="Xbox" width="20"
                                        className="me-2" />Xbox</a></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <img src="assets/nintendo-switch.svg" alt="Nintendo" width="20" className="me-2" />
                                            Nintendo
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-modern" href="contacto.html">Contacto</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-modern" href="sobrenosotros.html">Sobre nosotros</a>
                            </li>
                        </ul>

                        <ul className="navbar-nav d-flex flex-row gap-3">
                            <li className="nav-item">
                                <Link className="nav-link position-relative p-3 rounded-circle" to="/cart">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                                        className="bi bi-cart-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                    </svg>
                                    <span
                                        className="text-black fw-bold position-absolute fs-6 bottom-50 rounded-circle badge bg-body-tertiary"
                                        id="cartCounter">{cartCount}</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                {isLogged ? (
                                    <Link className="nav-link p-3 position-relative rounded-circle" to="/profile">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                        </svg>
                                    </Link>
                                ) : (
                                    <Link className="nav-link p-3 position-relative rounded-circle" to="/login">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                                            className="bi bi-person-fill" viewBox="0 0 16 16">
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                        </svg>
                                    </Link>
                                )}
                            </li>

                            {isLogged && (role === "ROLE_ADMIN" || role === "ROLE_SELLER") && (
                                <li className="nav-item">
                                    <Link className="nav-link p-3 position-relative rounded-circle" to="/admin">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                                            className="bi bi-person-exclamation" viewBox="0 0 16 16">
                                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                                            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 1 0V11a.5.5 0 0 0-.5-.5m0 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                                        </svg>
                                    </Link>
                                </li>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}