import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Cart() {
    const { items, addQuantity, subtractQuantity, removeFromCart, clearCart, getTotals } = useCart();
    const [paid, setPaid] = useState(false);

    const { subTotal, iva, total } = getTotals();

    function handlePay() {
        clearCart();
        setPaid(true);
        setTimeout(() => setPaid(false), 3000);
    }

    return (
        <section className="container-fluid">
            <div className="container my-5 min-vh-100" id="cartContainer">
                {items.length === 0 ? (
                    <div className="text-center py-5">
                        <h4 className="text-muted fs-3">Tu carrito está vacío 🛒</h4>
                        <p className="small">Agrega productos para continuar con tu compra</p>
                    </div>
                ) : (
                    <div className="row g-4 align-items-start">
                        <div className="col-md-8">
                            <h2 className="mb-4">Carrito de compras</h2>
                            {items.map(item => (
                                <div key={item.id} className="card mb-3 shadow-sm border-0">
                                    <div className="row g-0 align-items-center py-2">
                                        <div className="col-3 col-md-2 text-center">
                                            <img src={item.imagen} className="img-fluid" style={{width: "100px", height: "150px", objectFit: "cover", borderRadius: "8px"}} alt={item.nombre} />
                                        </div>
                                        <div className="col-6 col-md-7">
                                            <div className="card-body py-2">
                                                <h6 className="card-title mb-1">{item.nombre}</h6>
                                                <p className="text-muted mb-1 small">Precio: <strong>${Number(item.precio).toLocaleString('es-CL')}</strong></p>
                                                <p className="small text-secondary mb-0">Cantidad: {item.cantidad}</p>
                                            </div>
                                        </div>
                                        <div className="col-3 col-md-3 d-flex flex-row justify-content-end align-items-center gap-2 p-2">
                                            <button className="btn btn-outline-secondary btn-sm" onClick={() => addQuantity(item.id)} aria-label="aumentar">+
                                            </button>
                                            <button className="btn btn-outline-secondary btn-sm" onClick={() => subtractQuantity(item.id)} aria-label="disminuir">-
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(item.id)} aria-label="eliminar">Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="col-md-4">
                            <h2 className="mb-4">Resumen</h2>
                            <div className="card shadow-sm border-0 p-3" id="cartSummary">
                                <p className="d-flex justify-content-between">
                                    <span>Subtotal</span>
                                    <strong id="subtotal">${subTotal.toLocaleString('es-CL')}</strong>
                                </p>
                                <p className="d-flex justify-content-between">
                                    <span>IVA (19%)</span>
                                    <strong id="ivaTotal">${iva.toLocaleString('es-CL')}</strong>
                                </p>
                                <hr />
                                <p className="d-flex justify-content-between fs-5">
                                    <span>Total</span>
                                    <strong id="cartTotal">${total.toLocaleString('es-CL')}</strong>
                                </p>
                                <button className="btn btn-success w-100 mt-3" id="pagarButton" onClick={handlePay}>Pagar ahora</button>
                                <button id="clearCartButton" className="btn btn-outline-danger w-100 mt-2" onClick={clearCart}>Vaciar carrito</button>
                            </div>
                        </div>
                    </div>
                )}

                {paid && (
                    <div className="position-fixed top-50 start-50 translate-middle bg-white border shadow p-4" style={{ zIndex: 1050 }} role="dialog">
                        <h5>¡Pago realizado!</h5>
                        <p>Tu compra ha sido procesada y recibirás la información en tu correo electrónico.</p>
                    </div>
                )}
            </div>
        </section>
    );
}