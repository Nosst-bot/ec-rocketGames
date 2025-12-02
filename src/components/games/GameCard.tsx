import { useState } from "react";
import type { Game } from "../../client/types";
import { useCart } from "../context/CartContext";
import Toast from "../common/Toast";

export default function GameCard({ game }: { game: Game }) {
    const { addToCart } = useCart();
    const [showToast, setShowToast] = useState(false);

    const handleAddToCart = () => {
        addToCart(game);
        setShowToast(true);
    };

    return (
        <>
            <div className="col">
                <div className="card">
                    <img src={game.imageUrl} className="card-img-top" alt={game.title} style={{ height: "530px", objectFit: "cover" }} />
                    <div className="card-body">
                        <h5 className="card-title">{game.title}</h5>
                        <p className="card-text">{game.description}</p>
                        <span className="badge bg-danger fs-5 mb-2">${game.price} CLP</span>
                        <button onClick={handleAddToCart} className="btn w-100 text-white d-flex justify-content-center align-items-center gap-2" style={{ backgroundColor: "rgb(23, 19, 33)" }}>
                            <span>Agregar al carrito</span>
                            <svg className="ms-1" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" viewBox="0 0 16 16">
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {showToast && (
                <Toast
                    message={`✓ ${game.title} agregado al carrito`}
                    type="success"
                    duration={3000}
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    )
}