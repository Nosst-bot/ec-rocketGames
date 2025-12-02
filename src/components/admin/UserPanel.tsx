import { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import type { User } from "../../client/types";

export default function UserPanel() {
    const [users, setUsers] = useState<User[]>([]);
    const [message, setMessage] = useState<string>("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "ROLE_USER"
    });
    const [editingId, setEditingId] = useState<number | null>(null);

    const token = localStorage.getItem("token") || "";

    const fetchUsers = () => {
        fetch('http://localhost:8080/api/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(err => {
                console.error('Error fetching users:', err);
                showMessage('Error al cargar los usuarios');
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const showMessage = (msg: string) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 3000);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({ username: "", email: "", password: "", role: "ROLE_USER" });
    };

    const openAddModal = () => {
        resetForm();
        setShowAddModal(true);
    };

    const closeAddModal = () => {
        setShowAddModal(false);
        resetForm();
    };

    const openEditModal = (user: User) => {
        setFormData({
            username: user.username,
            email: user.email,
            password: "",
            role: user.role
        });
        setEditingId(user.id);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditingId(null);
        resetForm();
    };

    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            role: formData.role
        };

        fetch('http://localhost:8080/api/users/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(() => {
                showMessage('Usuario agregado exitosamente');
                closeAddModal();
                fetchUsers();
            })
            .catch(err => {
                console.error('Error adding user:', err);
                showMessage('Error al agregar el usuario');
            });
    };

    const handleEditUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;

        const payload = {
            username: formData.username,
            email: formData.email,
            role: formData.role
        };

        fetch(`http://localhost:8080/api/users/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(() => {
                showMessage('Usuario actualizado exitosamente');
                closeEditModal();
                fetchUsers();
            })
            .catch(err => {
                console.error('Error updating user:', err);
                showMessage('Error al actualizar el usuario');
            });
    };

    const handleDeleteUser = (id: number) => {
        if (!confirm('¿Está seguro de que desea eliminar este usuario?')) return;

        fetch(`http://localhost:8080/api/users/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.error || 'Error al eliminar');
                    });
                }
                return response.json();
            })
            .then(data => {
                showMessage(data.message || 'Usuario eliminado exitosamente');
                fetchUsers();
            })
            .catch(err => {
                console.error('Error deleting user:', err);
                showMessage(err.message || 'Error al eliminar el usuario');
            });
    };

    return (
        <>
            <Navbar />
            <section className="container-fluid pt-4">
                <div className="container-lg">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Panel de Usuarios</h1>
                        <button className="btn btn-primary" onClick={openAddModal}>
                            Agregar Usuario
                        </button>
                    </div>
                    {message && <div className="alert alert-info alert-dismissible fade show">{message}</div>}
                    <table className="table table-hover" id="userTable">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Email</th>
                                <th scope="col">Rol</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td><span className={`badge ${user.role === 'ROLE_ADMIN' ? 'bg-danger' : 'bg-info'}`}>{user.role}</span></td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            onClick={() => openEditModal(user)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDeleteUser(user.id)}
                                        >
                                            Eliminar
                                        </button>
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
                            <form onSubmit={handleAddUser}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Agregar Usuario</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={closeAddModal}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="addUsername" className="form-label">Usuario</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="addUsername"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="addEmail" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="addEmail"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="addPassword" className="form-label">Contraseña</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="addPassword"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="addRole" className="form-label">Rol</label>
                                        <select
                                            className="form-control"
                                            id="addRole"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="ROLE_USER">Usuario</option>
                                            <option value="ROLE_SELLER">Vendedor</option>
                                            <option value="ROLE_ADMIN">Admin</option>
                                        </select>
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
                            <form onSubmit={handleEditUser}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Editar Usuario</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={closeEditModal}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="editUsername" className="form-label">Usuario</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="editUsername"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editEmail" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="editEmail"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editRole" className="form-label">Rol</label>
                                        <select
                                            className="form-control"
                                            id="editRole"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="ROLE_USER">Usuario</option>
                                            <option value="ROLE_SELLER">Vendedor</option>
                                            <option value="ROLE_ADMIN">Admin</option>
                                        </select>
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
