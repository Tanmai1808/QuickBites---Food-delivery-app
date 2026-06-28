import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ROLE_COLORS = {
    Admin:           '#8e44ad',
    RestaurantOwner: '#e67e22',
    DeliveryPartner: '#27ae60',
    Customer:        '#3498db',
};
const VEHICLE_TYPES = ['BIKE', 'SCOOTER', 'CAR', 'BICYCLE'];

// Axios instance that always sends the token
const api = axios.create({ baseURL: "http://127.0.0.1:5001/api/admin" });
api.interceptors.request.use(cfg => {
    const token = localStorage.getItem("token");
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
});

const Field = ({ label, value, onChange, type = "text", readOnly = false }) => (
    <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '3px', fontWeight: 'bold' }}>{label}</label>
        <input
            type={type} value={value ?? ''} readOnly={readOnly}
            onChange={e => onChange && onChange(e.target.value)}
            style={{
                width: '100%', padding: '8px', borderRadius: '4px',
                border: '1px solid #ccc', fontSize: '14px', boxSizing: 'border-box',
                backgroundColor: readOnly ? '#f0f0f0' : 'white'
            }}
        />
    </div>
);

const AdminDashboard = () => {
    const [users, setUsers]       = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);
    const [searchTerm, setSearch] = useState("");
    const [editUser, setEditUser] = useState(null);
    const [formData, setForm]     = useState({});
    const navigate = useNavigate();

    const adminName = localStorage.getItem("name") || "Admin";

    // Handle 401/403 globally — kick to login
    const handleApiError = (err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
            alert(err.response.data.message || "Access denied.");
            localStorage.clear();
            navigate("/login");
        } else {
            setError(err.response?.data?.message || err.message);
        }
    };

    const fetchUsers = async () => {
        setLoading(true); setError(null);
        try {
            const res = await api.get("/users");
            if (res.data.status === "success") setUsers(res.data.users);
            else setError(res.data.message);
        } catch (err) { handleApiError(err); }
        finally { setLoading(false); }
    };

    useEffect(() => {
        // Block non-admins from even loading this page
        const role = localStorage.getItem("role");
        if (role !== "Admin") {
            alert("Access denied. Admins only.");
            navigate("/login");
            return;
        }
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.role_type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

    const handleUpdate = async () => {
        try {
            const res = await api.put("/user/update", formData);
            if (res.data.status === "success") {
                setEditUser(null);
                fetchUsers();
                alert("User updated successfully!");
            } else alert("Update failed: " + res.data.message);
        } catch (err) { handleApiError(err); }
    };

    const handleDelete = async (member_id) => {
        if (!window.confirm("Delete this user?")) return;
        try {
            const res = await api.delete(`/user/delete/${member_id}`);
            if (res.data.status === "success") fetchUsers();
            else alert("Delete failed: " + res.data.message);
        } catch (err) { handleApiError(err); }
    };

    const handleLogout = async () => {
        try {
            await axios.post("http://127.0.0.1:5001/api/auth/logout", {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
        } finally {
            localStorage.clear();
            navigate("/login");
        }
    };

    return (
        <div style={{ padding: '30px', fontFamily: 'Arial', backgroundColor: '#f5f6fa', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ margin: 0 }}>Admin Control Panel</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ color: '#555' }}>👤 {adminName}</span>
                    <button onClick={handleLogout}
                        style={{ padding: '8px 16px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Edit Modal */}
            {editUser && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{ background: 'white', borderRadius: '10px', padding: '30px', width: '560px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ margin: 0 }}>Edit User #{editUser.member_id}</h2>
                            <span style={{ padding: '4px 12px', borderRadius: '12px', color: 'white', fontSize: '12px', backgroundColor: ROLE_COLORS[editUser.role_type] || '#999' }}>
                                {editUser.role_type}
                            </span>
                        </div>

                        <p style={{ fontWeight: 'bold', color: '#2c3e50', borderBottom: '1px solid #eee', paddingBottom: '6px' }}>Personal Information</p>
                        <Field label="Full Name"      value={formData.name}           onChange={v => set('name', v)} />
                        <Field label="Email"          value={formData.email}          onChange={v => set('email', v)} />
                        <Field label="Contact Number" value={formData.contact_number} onChange={v => set('contact_number', v)} />
                        <Field label="Username"       value={formData.username}       onChange={v => set('username', v)} />
                        <Field label="Date of Birth"  value={formData.dateOfBirth}    onChange={v => set('dateOfBirth', v)} type="date" />

                        {editUser.role_type === 'Customer' && (<>
                            <p style={{ fontWeight: 'bold', color: '#3498db', borderBottom: '1px solid #eee', paddingBottom: '6px', marginTop: '20px' }}>Customer Details</p>
                            <Field label="Customer ID"    value={formData.customer_id}   readOnly />
                            <Field label="Signup Date"    value={formData.signup_date}   readOnly />
                            <Field label="Loyalty Points" value={formData.loyalty_points} onChange={v => set('loyalty_points', v)} type="number" />
                        </>)}

                        {editUser.role_type === 'DeliveryPartner' && (<>
                            <p style={{ fontWeight: 'bold', color: '#27ae60', borderBottom: '1px solid #eee', paddingBottom: '6px', marginTop: '20px' }}>Delivery Partner Details</p>
                            <Field label="Partner ID"     value={formData.partner_id}    readOnly />
                            <Field label="License ID"     value={formData.licenseID}     onChange={v => set('licenseID', v)} />
                            <Field label="Vehicle Number" value={formData.vehicleNumber} onChange={v => set('vehicleNumber', v)} />
                            <div style={{ marginBottom: '12px' }}>
                                <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '3px', fontWeight: 'bold' }}>Vehicle Type</label>
                                <select value={formData.vehicle_type ?? ''} onChange={e => set('vehicle_type', e.target.value)}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' }}>
                                    {VEHICLE_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
                                </select>
                            </div>
                            <Field label="Average Rating" value={formData.averageRating} readOnly />
                        </>)}

                        {editUser.role_type === 'RestaurantOwner' && (<>
                            <p style={{ fontWeight: 'bold', color: '#e67e22', borderBottom: '1px solid #eee', paddingBottom: '6px', marginTop: '20px' }}>Restaurant Owner Details</p>
                            <Field label="Owner ID"        value={formData.owner_id}        readOnly />
                            <Field label="Role Start Date" value={formData.role_start_date} onChange={v => set('role_start_date', v)} type="date" />
                            <div style={{ marginBottom: '12px' }}>
                                <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '3px', fontWeight: 'bold' }}>Active Status</label>
                                <select value={formData.is_active ? '1' : '0'} onChange={e => set('is_active', e.target.value === '1')}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' }}>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                        </>)}

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
                            <button onClick={() => setEditUser(null)}
                                style={{ padding: '10px 24px', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer', background: 'white' }}>
                                Cancel
                            </button>
                            <button onClick={handleUpdate}
                                style={{ padding: '10px 24px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Search */}
            <div style={{ marginBottom: '20px' }}>
                <input placeholder="Search by name or role..."
                    style={{ padding: '10px', width: '300px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' }}
                    onChange={e => setSearch(e.target.value)} />
            </div>

            {loading && <p style={{ color: '#888' }}>Loading users...</p>}
            {error   && <p style={{ color: 'red' }}>⚠️ {error}</p>}

            {!loading && !error && (
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                            {['ID','Name','Email','Phone','DOB','Role','Actions'].map(h => (
                                <th key={h} style={{ padding: '14px 16px', textAlign: 'left' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length === 0 ? (
                            <tr><td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: '#888' }}>No users found.</td></tr>
                        ) : filteredUsers.map((user, i) => (
                            <tr key={user.member_id} style={{ borderBottom: '1px solid #eee', backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                                <td style={{ padding: '14px 16px' }}>{user.member_id}</td>
                                <td style={{ padding: '14px 16px', fontWeight: '500' }}>{user.name}</td>
                                <td style={{ padding: '14px 16px' }}>{user.email}</td>
                                <td style={{ padding: '14px 16px' }}>{user.contact_number || '—'}</td>
                                <td style={{ padding: '14px 16px' }}>{user.dateOfBirth || '—'}</td>
                                <td style={{ padding: '14px 16px' }}>
                                    <span style={{ padding: '4px 12px', borderRadius: '12px', color: 'white', fontSize: '12px', backgroundColor: ROLE_COLORS[user.role_type] || '#999' }}>
                                        {user.role_type}
                                    </span>
                                </td>
                                <td style={{ padding: '14px 16px' }}>
                                    <button onClick={() => { setEditUser(user); setForm({ ...user }); }}
                                        style={{ color: '#3498db', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold', marginRight: '12px' }}>Edit</button>
                                    <button onClick={() => handleDelete(user.member_id)}
                                        style={{ color: '#e74c3c', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminDashboard;