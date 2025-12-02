import { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import type { Game } from "../../client/types";

export default function Admin() {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/games')
            .then(response => response.json())
            .then(data => setGames(data))
    }, []);

    return (
        <>
            <Navbar />
            <section className="container-fluid pt-4">
                <div className="container-lg">
                    <div className="d-flex justify-content-between">
                        <h1>Panel de administrador</h1>
                        <button className="btn btn-primary" type="button" data-bs-toggle="modal"
                            data-bs-target="#addProductModal">Agregar producto</button>
                    </div>
                    <table className="table table-hover" id="adminTable">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Acciones</th>
                            </tr>
                            {games.map((game) => (
                                <tr key={game.id}>
                                    <td><img src={game.imageUrl} alt={game.title} style={{width: "100px", height: "150px", objectFit: "cover", borderRadius: "8px"}} /></td>
                                    <td>{game.title}</td>
                                    <td>${game.price}</td>
                                    <td>{game.stock}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary me-2 data-edit" data-id={`${game.id}`}>Editar</button>
                                        <button className="btn btn-sm btn-danger data-delete" value={`${game.id}`}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </thead>
                    </table>
                </div>
                <div className="modal" tabIndex={-1} id="addProductModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form id="addProductForm">
                                <div className="modal-header">
                                    <h5 className="modal-title">Agregar producto</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="addNombre" className="form-label">Nombre</label>
                                        <input type="text" className="form-control" id="addNombre" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="addPrecio" className="form-label">Precio</label>
                                        <input type="number" className="form-control" id="addPrecio" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="addStock" className="form-label">Stock</label>
                                        <input type="number" className="form-control" id="addStock" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="addImagen" className="form-label">Ruta de imagen</label>
                                        <input type="text" className="form-control" id="addImagen"
                                            placeholder="assets/nombreimagen.ext" required />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="submit" className="btn btn-primary">Agregar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="modal" tabIndex={-1} id="editProductModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form id="editProductForm">
                                <div className="modal-header">
                                    <h5 className="modal-title">Editar producto</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <input type="hidden" id="editId" />
                                    <div className="mb-3">
                                        <label htmlFor="editNombre" className="form-label">Nombre</label>
                                        <input type="text" className="form-control" id="editNombre" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editPrecio" className="form-label">Precio</label>
                                        <input type="number" className="form-control" id="editPrecio" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editStock" className="form-label">Stock</label>
                                        <input type="number" className="form-control" id="editStock" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editImagen" className="form-label">Ruta de imagen</label>
                                        <input type="text" className="form-control" id="editImagen" required />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="submit" className="btn btn-primary">Guardar cambios</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}