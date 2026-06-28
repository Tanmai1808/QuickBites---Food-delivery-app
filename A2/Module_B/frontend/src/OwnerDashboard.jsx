import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

const styles = {
    container: { display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7f6', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' },
    sidebar: { width: '260px', backgroundColor: '#1a1a2e', color: 'white', padding: '25px' },
    main: { flex: 1, padding: '40px', overflowY: 'auto' },
    card: { backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', marginBottom: '20px' },
    tabBtn: (active) => ({
        display: 'block', width: '100%', padding: '14px', textAlign: 'left',
        backgroundColor: active ? '#e74c3c' : 'transparent', color: 'white',
        border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '10px',
        fontWeight: active ? 'bold' : 'normal', transition: '0.3s'
    }),
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
    th: { textAlign: 'left', padding: '15px', borderBottom: '2px solid #f0f0f0', color: '#2d3436' },
    td: { padding: '15px', borderBottom: '1px solid #f0f0f0', color: '#636e72' },
    input: { padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #dfe6e9', width: '100%', fontSize: '14px' },
    btnPrimary: { backgroundColor: '#e74c3c', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    btnSecondary: { backgroundColor: '#2ecc71', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginLeft: '8px' },
    btnOutline: { backgroundColor: 'transparent', border: '1px solid #dcdde1', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', marginRight: '8px', fontSize: '13px' }
};

const OwnerDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const memberId = location.state?.memberId || savedUser?.member_id || savedUser?.id;

    const [activeTab, setActiveTab] = useState('orders');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [editItem, setEditItem] = useState(null);
    const [newItem, setNewItem] = useState({ item_name: '', price: '', category_id: 1 });
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileForm, setProfileForm] = useState({});

    const API_BASE = "http://127.0.0.1:5001/api/restaurant";

    const fetchData = useCallback(async () => {
        if (!memberId) {
            navigate('/login');
            return;
        }
        try {
            setLoading(true);
            const res = await axios.get(`${API_BASE}/dashboard/${memberId}`);
            if (res.data.status === "success") {
                setData(res.data);
                setProfileForm(res.data.restaurant); // Sync profile form with fresh data
            }
        } catch (err) {
            console.error("Dashboard Fetch Error:", err);
            alert("Connection error: Make sure the Flask server is running on port 5001.");
        } finally {
            setLoading(false);
        }
    }, [memberId, navigate]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleUpdateOrder = async (orderId, status) => {
        try {
            await axios.post(`${API_BASE}/order/update_status`, { order_id: orderId, status });
            fetchData(); 
        } catch (err) {
            alert("Failed to update order status.");
        }
    };

    const handleSaveMenu = async () => {
        // Basic validation before even hitting the server
        const name = editItem ? editItem.item_name : newItem.item_name;
        const price = editItem ? editItem.price : newItem.price;

        if (!name || !price) {
            alert("Please enter both Name and Price");
            return;
        }

        try {
            if (editItem) {
                await axios.put(`${API_BASE}/menu/update`, editItem);
            } else {
                const payload = { 
                    item_name: newItem.item_name,
                    price: newItem.price,
                    category_id: newItem.category_id || 1,
                    restaurant_id: data.restaurant.restaurant_id 
                };
                
                console.log("Attempting to add item with payload:", payload);
                await axios.post(`${API_BASE}/menu/add`, payload);
            }
            
            // Reset forms and refresh
            setEditItem(null);
            setNewItem({ item_name: '', price: '', category_id: 1 });
            fetchData();
            alert("Menu updated successfully!");
        } catch (err) {
            console.error("Menu Save Error:", err.response?.data || err.message);
            alert("Error saving menu data. Check the Python console for the SQL error.");
        }
    };

    const handleDeleteItem = async (itemId) => {
        if (window.confirm("Permanently delete this item?")) {
            try {
                await axios.delete(`${API_BASE}/menu/delete/${itemId}`);
                fetchData();
            } catch (err) {
                alert("Could not delete item.");
            }
        }
    };

    const handleUpdateProfile = async () => {
        try {
            await axios.put(`${API_BASE}/profile/update`, profileForm);
            setIsEditingProfile(false);
            fetchData();
            alert("Profile updated successfully!");
        } catch (err) { 
            alert("Failed to update profile"); 
        }
    };

    if (loading) return <div style={{padding: '100px', textAlign: 'center'}}><h2>Loading Dashboard...</h2></div>;
    if (!data) return <div style={{padding: '100px', textAlign: 'center'}}>No restaurant linked to this account.</div>;

    const { restaurant, orders, menu, stats } = data;

    return (
        <div style={styles.container}>
            {/* SIDEBAR */}
            <div style={styles.sidebar}>
                <h1 style={{color: '#e74c3c', marginBottom: '5px'}}>Quick Bites</h1>
                <p style={{fontSize: '14px', color: '#a4b0be', marginBottom: '20px'}}>{restaurant?.name} Owner</p>
                
                <div style={{marginBottom: '30px', padding: '15px', backgroundColor: '#2d3436', borderRadius: '10px'}}>
                    <p style={{margin: 0, fontSize: '12px', color: '#dfe6e9'}}>REVENUE</p>
                    <h3 style={{margin: 0, color: '#2ecc71'}}>₹{stats?.revenue || 0}</h3>
                </div>

                <button style={styles.tabBtn(activeTab === 'orders')} onClick={() => setActiveTab('orders')}>📋 Live Orders</button>
                <button style={styles.tabBtn(activeTab === 'menu')} onClick={() => setActiveTab('menu')}>🍴 Manage Menu</button>
                <button style={styles.tabBtn(activeTab === 'profile')} onClick={() => setActiveTab('profile')}>🏢 Restaurant Profile</button>
                
                <button 
                    onClick={() => { localStorage.clear(); navigate('/login'); }}
                    style={{...styles.tabBtn(false), marginTop: '50px', color: '#ff7675'}}>
                    🚪 Logout
                </button>
            </div>

            {/* MAIN CONTENT */}
            <div style={styles.main}>
                {activeTab === 'orders' && (
                    <div>
                        <h2 style={{marginBottom: '20px'}}>Active Orders</h2>
                        {orders.length === 0 ? <p>No orders yet.</p> : orders.map(order => (
                            <div key={order.order_id} style={styles.card}>
                                <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px'}}>
                                    <strong>Order #{order.order_id}</strong>
                                    <span style={{fontSize: '13px'}}>{new Date(order.order_time).toLocaleString()}</span>
                                </div>
                                <p style={{fontWeight: '500', margin: '15px 0'}}>{order.items_summary}</p>
                                <p>Status: <b style={{color: '#e74c3c'}}>{order.order_status}</b> | Delivery: <b>{order.delivery_status}</b></p>
                                
                                <div style={{marginTop: '15px'}}>
                                    {order.order_status === 'PLACED' && (
                                        <button onClick={() => handleUpdateOrder(order.order_id, 'PREPARING')} style={styles.btnSecondary}>Accept & Prepare</button>
                                    )}
                                    {order.order_status === 'PREPARING' && (
                                        <button onClick={() => handleUpdateOrder(order.order_id, 'OUT_FOR_DELIVERY')} style={styles.btnSecondary}>Dispatch Delivery</button>
                                    )}
                                    {['PLACED', 'PREPARING'].includes(order.order_status) && (
                                        <button onClick={() => handleUpdateOrder(order.order_id, 'CANCELLED')} style={styles.btnPrimary}>Cancel</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'menu' && (
                    <div>
                        <h2 style={{marginBottom: '20px'}}>Menu Management</h2>
                        <div style={styles.card}>
                            <h4>{editItem ? 'Edit Item' : 'Add New Item'}</h4>
                            <div style={{display: 'flex', gap: '15px'}}>
                                <input style={styles.input} placeholder="Item Name" 
                                    value={editItem ? editItem.item_name : newItem.item_name} 
                                    onChange={(e) => editItem ? setEditItem({...editItem, item_name: e.target.value}) : setNewItem({...newItem, item_name: e.target.value})} 
                                />
                                <input style={styles.input} type="number" placeholder="Price" 
                                    value={editItem ? editItem.price : newItem.price} 
                                    onChange={(e) => editItem ? setEditItem({...editItem, price: e.target.value}) : setNewItem({...newItem, price: e.target.value})} 
                                />
                            </div>
                            <button style={styles.btnSecondary} onClick={handleSaveMenu}>{editItem ? 'Save' : 'Add'}</button>
                            {editItem && <button style={{marginLeft: '10px'}} onClick={() => setEditItem(null)}>Cancel</button>}
                        </div>

                        <div style={styles.card}>
                            <table style={styles.table}>
                                <thead>
                                    <tr><th style={styles.th}>Name</th><th style={styles.th}>Price</th><th style={styles.th}>Actions</th></tr>
                                </thead>
                                <tbody>
                                    {menu.map(item => (
                                        <tr key={item.item_id}>
                                            <td style={styles.td}>{item.item_name}</td>
                                            <td style={styles.td}>₹{item.price}</td>
                                            <td style={styles.td}>
                                                <button style={styles.btnOutline} onClick={() => setEditItem(item)}>Edit</button>
                                                <button style={{...styles.btnOutline, color: 'red'}} onClick={() => handleDeleteItem(item.item_id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div>
                        {/* RESTAURANT PROFILE CARD */}
                        <div style={styles.card}>
                            <h2>Profile Settings</h2>
                            {isEditingProfile ? (
                                <div>
                                    <label>Restaurant Name</label>
                                    <input style={styles.input} value={profileForm.name || ''} 
                                        onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} />
                                    
                                    <label>Address</label>
                                    <input style={styles.input} value={profileForm.addressLine || ''} 
                                        onChange={(e) => setProfileForm({...profileForm, addressLine: e.target.value})} />
                                    
                                    <label>Contact Number</label>
                                    <input style={styles.input} value={profileForm.contact_number || ''} 
                                        onChange={(e) => setProfileForm({...profileForm, contact_number: e.target.value})} />
                                    
                                    <label>Status</label>
                                    <select style={styles.input} value={profileForm.is_open} 
                                        onChange={(e) => setProfileForm({...profileForm, is_open: e.target.value})}>
                                        <option value="1">Open</option>
                                        <option value="0">Closed</option>
                                    </select>
                                    
                                    <button style={styles.btnSecondary} onClick={handleUpdateProfile}>Save Profile</button>
                                    <button style={{marginLeft: '10px', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', cursor: 'pointer'}} 
                                        onClick={() => setIsEditingProfile(false)}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <p><strong>Name:</strong> {restaurant?.name}</p>
                                    <p><strong>Address:</strong> {restaurant?.addressLine}</p>
                                    <p><strong>Contact:</strong> {restaurant?.contact_number || 'Not provided'}</p>
                                    <p><strong>Status:</strong> {restaurant?.is_open === 1 ? '✅ Open' : '❌ Closed'}</p>
                                    <button style={styles.btnPrimary} onClick={() => setIsEditingProfile(true)}>Edit Profile</button>
                                </div>
                            )}
                        </div>

                        {/* CUSTOMER REVIEWS CARD */}
                        <div style={styles.card}>
                            <h2>Customer Reviews & Ratings</h2>
                            {data.reviews && data.reviews.length > 0 ? (
                                <div style={{marginTop: '15px'}}>
                                    {data.reviews.map((rev, index) => (
                                        <div key={index} style={{
                                            padding: '15px', 
                                            borderBottom: index !== data.reviews.length - 1 ? '1px solid #f0f0f0' : 'none',
                                            backgroundColor: '#fafafa',
                                            borderRadius: '8px',
                                            marginBottom: '10px'
                                        }}>
                                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                <strong>{rev.customer_name || "Anonymous Customer"}</strong>
                                                <span style={{color: '#f1c40f', fontWeight: 'bold'}}>
                                                    {'⭐'.repeat(rev.rating)} ({rev.rating}/5)
                                                </span>
                                            </div>
                                            <p style={{margin: '10px 0 0 0', color: '#555', fontStyle: 'italic'}}>
                                                "{rev.review_text || "No comment provided."}"
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={{color: '#7f8c8d', fontStyle: 'italic'}}>No reviews found for your restaurant yet.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OwnerDashboard;