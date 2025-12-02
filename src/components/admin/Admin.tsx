import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../common/Navbar";
import type { Game } from "../../client/types";

export default function Admin() {
    const [games, setGames] = useState<Game[]>([]);
    const [message, setMessage] = useState<string>("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        precio: "",
        stock: "",
        imagen: "",
        description: ""
    });
    const [editingId, setEditingId] = useState<number | null>(null);
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    const fetchGames = () => {
        fetch('http://localhost:8080/api/games')
            .then(response => response.json())
            .then(data => setGames(data))
            .catch(err => {
                console.error('Error fetching games:', err);
                setMessage('Error al cargar los juegos');
            });
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const showMessage = (msg: string) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 3000);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({ nombre: "", precio: "", stock: "", imagen: "", description: "" });
    };

    const openAddModal = () => {
        resetForm();
        setShowAddModal(true);
    };

    const closeAddModal = () => {
        setShowAddModal(false);
        resetForm();
    };

    const openEditModal = (game: Game) => {
        setFormData({
            nombre: game.title,
            precio: String(game.price),
            stock: String(game.stock),
            imagen: game.imageUrl || "",
            description: game.description || ''
        });
        setEditingId(game.id);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditingId(null);
        resetForm();
    };

    const handleDeleteGame = (id: number) => {
        if (!confirm('¿Está seguro de que desea eliminar este producto?')) return;

        fetch(`http://localhost:8080/api/games/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } })
            .then(() => {
                showMessage('Producto eliminado exitosamente');
                fetchGames();
            })
            .catch(err => {
                console.error('Error deleting product:', err);
                showMessage('Error al eliminar el producto');
            });
    };

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            title: formData.nombre,
            price: Number(formData.precio),
            stock: Number(formData.stock),
            imageUrl: "assets/coverDefault.jpg",
            description: formData.description
        };

        fetch('http://localhost:8080/api/games', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(() => {
                showMessage('Producto agregado exitosamente');
                closeAddModal();
                fetchGames();
            })
            .catch(err => {
                console.error('Error adding product:', err);
                showMessage('Error al agregar el producto');
            });
    };

    const handleEditProduct = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;

        const payload = {
            title: formData.nombre,
            price: Number(formData.precio),
            stock: Number(formData.stock),
            imageUrl: formData.imagen,
            description: formData.description
        };

        fetch(`http://localhost:8080/api/games/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(() => {
                showMessage('Producto actualizado exitosamente');
                closeEditModal();
                fetchGames();
            })
            .catch(err => {
                console.error('Error updating product:', err);
                showMessage('Error al actualizar el producto');
            });
    };

    return (
        <>
            <Navbar />
            <section className="container-fluid pt-4">
                <div className="container-lg">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Panel de administrador</h1>
                        <div className="d-flex gap-2">
                            {role === "ROLE_ADMIN" && (
                                <Link to="/admin/users" className="btn btn-info">Gestionar Usuarios</Link>
                            )}
                            <button className="btn btn-primary" onClick={openAddModal}>
                                Agregar producto
                            </button>
                        </div>
                    </div>

                    {message && <div className="alert alert-info alert-dismissible fade show">{message}</div>}
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Imagen</th>
                                <th scope="col">Nombre y descripción</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.map((game) => (
                                <tr key={game.id}>
                                    <td>
                                        <img
                                            src={game.imageUrl}
                                            alt={game.title}
                                            style={{
                                                width: "100px",
                                                height: "150px",
                                                objectFit: "cover",
                                                borderRadius: "8px"
                                            }}
                                        />
                                    </td>
                                    <td>{game.title}<br /><span className="fw-light small text-muted d-block" style={{maxWidth: "300px"}}>{game.description}</span></td>
                                    <td>${game.price.toLocaleString('es-CL')}</td>
                                    <td>{game.stock}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            onClick={() => openEditModal(game)}
                                        >
                                            Editar
                                        </button>
                                        {role === "ROLE_ADMIN" && (
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDeleteGame(game.id)}
                                            >
                                                Eliminar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {showAddModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form onSubmit={handleAddProduct}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Agregar producto</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={closeAddModal}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="addNombre" className="form-label">Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="addNombre"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="addPrecio" className="form-label">Precio</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="addPrecio"
                                            name="precio"
                                            value={formData.precio}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="addStock" className="form-label">Stock</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="addStock"
                                            name="stock"
                                            value={formData.stock}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editDescription" className="form-label">Descripción</label>
                                        <textarea
                                            className="form-control"
                                            style={{ resize: "none" }}
                                            id="editDescription"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={closeAddModal}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-primary">Agregar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form onSubmit={handleEditProduct}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Editar producto</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={closeEditModal}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="editNombre" className="form-label">Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="editNombre"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editPrecio" className="form-label">Precio</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="editPrecio"
                                            name="precio"
                                            value={formData.precio}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editStock" className="form-label">Stock</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="editStock"
                                            name="stock"
                                            value={formData.stock}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editImagen" className="form-label">Ruta de imagen</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="editImagen"
                                            name="imagen"
                                            value={formData.imagen}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editDescription" className="form-label">Descripción</label>
                                        <textarea
                                            className="form-control"
                                            style={{ resize: "none" }}
                                            id="editDescription"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={closeEditModal}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-primary">Guardar cambios</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}