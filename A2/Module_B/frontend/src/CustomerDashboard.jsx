import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// --- LEAFLET ICON FIX ---
// This prevents the marker from being invisible due to Webpack path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Helper component to handle map clicks
function LocationMarker({ coords, setCoords }) {
  useMapEvents({
    click(e) {
      setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return coords === null ? null : <Marker position={[coords.lat, coords.lng]} />;
}

function CustomerDashboard() {
  const navigate = useNavigate();
  
  // States
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home'); 
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]); 
  const [profile, setProfile] = useState(null); 
  const [cart, setCart] = useState({});
  const [selectedTitle, setSelectedTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Checkout States
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMode, setPaymentMode] = useState('CASH');
  const [coords, setCoords] = useState({ lat: 17.3850, lng: 78.4867 }); // Default: Hyderabad

  // Profile Editing States
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px'
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        const mId = parsedUser.member_id || parsedUser.id;

        if (mId) {
            fetchProfile(mId);
            fetch('http://127.0.0.1:5001/api/customer/init')
              .then(res => res.json())
              .then(data => {
                setCategories(data.categories || []);
                setRestaurants(data.restaurants || []);
                setIsLoading(false);
              });
        }
    } else {
        navigate('/login');
    }
  }, [navigate]);

  const fetchProfile = (mId) => {
    fetch(`http://127.0.0.1:5001/api/customer/profile/${mId}`)
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success') {
            setProfile(data.data);
            setFormData(data.data);
        }
      });
  };

  const finalizeOrder = () => {
    const orderData = {
        member_id: user.member_id || user.id,
        cart: cart,
        payment_mode: paymentMode,
        lat: coords.lat,
        lng: coords.lng,
        total: totalCartPrice
    };

    fetch('http://127.0.0.1:5001/api/customer/place_order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === 'success') {
            alert(`Order Placed Successfully! Order ID: ${data.order_id}`);
            setCart({});
            setShowCheckout(false);
            handleViewOrders(); 
        } else {
            alert("Error placing order: " + data.message);
        }
    })
    .catch(err => console.error("Order Error:", err));
  };

  const handleSaveProfile = () => {
    const mId = user?.member_id || user?.id;
    fetch(`http://127.0.0.1:5001/api/customer/profile/update/${mId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            alert("Profile updated!");
            setProfile(formData);
            setIsEditing(false);
        }
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleViewOrders = () => {
    setView('orders');
    const userId = user?.member_id || user?.id;
    if (userId) {
        fetch(`http://127.0.0.1:5001/api/customer/orders/${userId}`)
          .then(res => res.json())
          .then(data => setOrders(data.data || []));
    }
  };

  const handleCategoryClick = (cat) => {
    setSelectedTitle(`Items for ${cat.category_name}`);
    fetch(`http://127.0.0.1:5001/api/menu/filter?category_id=${cat.category_id}`)
      .then(res => res.json())
      .then(data => {
        setMenuItems(data.data || []);
        setView('menu');
      });
  };

  const handleResClick = (res) => {
    setSelectedTitle(`Menu: ${res.name}`);
    fetch(`http://127.0.0.1:5001/api/menu/filter?restaurant_id=${res.restaurant_id}`)
      .then(res => res.json())
      .then(data => {
        setMenuItems(data.data || []);
        setView('menu');
      });
  };

  const addToCart = (item) => {
    setCart(prev => {
      const current = prev[item.item_id] || { ...item, qty: 0 };
      return { ...prev, [item.item_id]: { ...current, qty: current.qty + 1 } };
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => {
      if (!prev[itemId]) return prev;
      const newQty = prev[itemId].qty - 1;
      if (newQty <= 0) {
        const { [itemId]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: { ...prev[itemId], qty: newQty } };
    });
  };

  const totalCartPrice = Object.values(cart).reduce((acc, item) => acc + (item.price * item.qty), 0);

  if (isLoading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading Quick Bites...</div>;

  return (
    <div style={{ fontFamily: 'Arial', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      
      {/* NAVBAR */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', backgroundColor: '#fff', boxShadow: '0 2px 5px #ddd', position: 'sticky', top: 0, zIndex: 100 }}>
        <h2 style={{ color: '#e74c3c', margin: 0, cursor: 'pointer' }} onClick={() => setView('home')}>Quick Bites</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ cursor: 'pointer', fontWeight: view === 'home' ? 'bold' : 'normal' }} onClick={() => setView('home')}>Home</span>
          <span style={{ cursor: 'pointer', fontWeight: view === 'orders' ? 'bold' : 'normal' }} onClick={handleViewOrders}>Orders</span>
          <span style={{ cursor: 'pointer', fontWeight: view === 'profile' ? 'bold' : 'normal' }} onClick={() => setView('profile')}>Profile</span>
          <button onClick={handleLogout} style={{ border: '1px solid #e74c3c', color: '#e74c3c', background: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
        </div>
      </nav>

      <div style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
        
        {view === 'home' && (
          <>
            <h3>Explore Categories</h3>
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '15px' }}>
              {categories.map(cat => (
                <div key={cat.category_id} onClick={() => handleCategoryClick(cat)} style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', minWidth: '100px', textAlign: 'center', cursor: 'pointer', border: '1px solid #eee' }}>
                  {cat.category_name}
                </div>
              ))}
            </div>
            <h3>Restaurants</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
              {restaurants.map(res => (
                <div key={res.restaurant_id} onClick={() => handleResClick(res)} style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee', cursor: 'pointer' }}>
                  <strong>{res.name}</strong>
                  <p style={{ fontSize: '12px', color: '#777' }}>📍 {res.city} • ⭐ {res.rating || 'New'}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {view === 'menu' && (
          <div>
            <button onClick={() => setView('home')} style={{ marginBottom: '10px', padding: '5px 15px', cursor: 'pointer' }}>← Back</button>
            <h2>{selectedTitle}</h2>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ flex: 2 }}>
                {menuItems.map(item => (
                  <div key={item.item_id} style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#fff', padding: '15px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #eee' }}>
                    <div><strong>{item.item_name}</strong><p style={{ margin: '5px 0', color: '#27ae60', fontWeight: 'bold' }}>₹{item.price}</p></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {cart[item.item_id] ? (
                        <>
                          <button onClick={() => removeFromCart(item.item_id)}>-</button>
                          <span>{cart[item.item_id].qty}</span>
                          <button onClick={() => addToCart(item)}>+</button>
                        </>
                      ) : (
                        <button onClick={() => addToCart(item)} style={{ backgroundColor: '#27ae60', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '5px' }}>ADD</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {Object.keys(cart).length > 0 && (
                <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: '80px' }}>
                  <h3>Your Cart</h3>
                  {Object.values(cart).map(cItem => (
                    <div key={cItem.item_id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span>{cItem.item_name} x {cItem.qty}</span>
                      <span>₹{(cItem.price * cItem.qty).toFixed(2)}</span>
                    </div>
                  ))}
                  <hr />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>Total:</span><span>₹{totalCartPrice.toFixed(2)}</span>
                  </div>
                  <button onClick={() => setShowCheckout(true)} style={{ width: '100%', marginTop: '20px', padding: '12px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>

            {/* CHECKOUT MODAL WITH MAP */}
            {showCheckout && (
              <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', width: '500px', boxShadow: '0 5px 25px rgba(0,0,0,0.2)' }}>
                  <h2 style={{ marginTop: 0 }}>Finalize Order</h2>
                  
                  <label><strong>Payment Mode:</strong></label>
                  <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)} style={inputStyle}>
                    <option value="CASH">Cash on Delivery</option>
                    <option value="CARD">Credit / Debit Card</option>
                    <option value="UPI">UPI Payment</option>
                  </select>

                  <label><strong>Pin Delivery Location:</strong></label>
                  <div style={{ height: '250px', width: '100%', borderRadius: '10px', overflow: 'hidden', margin: '10px 0', border: '1px solid #ddd' }}>
                    <MapContainer center={[coords.lat, coords.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <LocationMarker coords={coords} setCoords={setCoords} />
                    </MapContainer>
                  </div>
                  <p style={{ fontSize: '11px', color: '#e67e22' }}>📍 Selected: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</p>

                  <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                    <button onClick={() => setShowCheckout(false)} style={{ flex: 1, padding: '12px', background: '#eee', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={finalizeOrder} style={{ flex: 2, padding: '12px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
                      Confirm Order (₹{totalCartPrice.toFixed(2)})
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW: PROFILE */}
        {view === 'profile' && (
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>Account Details</h2>
                <button 
                    onClick={() => setIsEditing(!isEditing)} 
                    style={{ background: isEditing ? '#95a5a6' : '#3498db', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>
            <hr style={{ margin: '20px 0' }} />
            
            {profile ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                    {/* Column 1: Personal Info */}
                    <div>
                        <h4 style={{ color: '#e74c3c', marginBottom: '15px' }}>Personal Information</h4>
                        
                        <label><strong>Name:</strong></label>
                        {isEditing ? 
                            <input style={inputStyle} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /> 
                            : <p style={{ marginBottom: '15px' }}>{profile.name}</p>}

                        <label><strong>Email:</strong> (Cannot be changed)</label>
                        <p style={{ marginBottom: '15px', color: '#7f8c8d' }}>{profile.email}</p>

                        <label><strong>Phone:</strong></label>
                        {isEditing ? 
                            <input style={inputStyle} value={formData.contact_number} onChange={e => setFormData({...formData, contact_number: e.target.value})} /> 
                            : <p style={{ marginBottom: '15px' }}>{profile.contact_number || 'N/A'}</p>}

                        <label><strong>DOB:</strong></label>
                        {isEditing ? 
                            <input type="date" style={inputStyle} value={formData.dateOfBirth?.split('T')[0]} onChange={e => setFormData({...formData, dateOfBirth: e.target.value})} /> 
                            : <p style={{ marginBottom: '15px' }}>{profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'N/A'}</p>}
                    </div>

                    {/* Column 2: Address Info */}
                    <div>
                        <h4 style={{ color: '#e74c3c', marginBottom: '15px' }}>Delivery Address</h4>
                        
                        <label><strong>House No:</strong></label>
                        {isEditing ? 
                            <input style={inputStyle} value={formData.house_no} onChange={e => setFormData({...formData, house_no: e.target.value})} /> 
                            : <p style={{ marginBottom: '15px' }}>{profile.house_no || 'N/A'}</p>}

                        <label><strong>Street:</strong></label>
                        {isEditing ? 
                            <input style={inputStyle} value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} /> 
                            : <p style={{ marginBottom: '15px' }}>{profile.street || 'N/A'}</p>}

                        <label><strong>City:</strong></label>
                        {isEditing ? 
                            <input style={inputStyle} value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} /> 
                            : <p style={{ marginBottom: '15px' }}>{profile.city || 'N/A'}</p>}

                        <label><strong>Pincode:</strong></label>
                        {isEditing ? 
                            <input style={inputStyle} value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} /> 
                            : <p style={{ marginBottom: '15px' }}>{profile.pincode || 'N/A'}</p>}

                        <label><strong>Landmark:</strong></label>
                        {isEditing ? 
                            <input style={inputStyle} value={formData.landmark} onChange={e => setFormData({...formData, landmark: e.target.value})} /> 
                            : <p style={{ marginBottom: '15px' }}>{profile.landmark || 'N/A'}</p>}
                    </div>
                </div>
            ) : <p>Loading profile...</p>}

            {isEditing && (
                <button 
                    onClick={handleSaveProfile} 
                    style={{ marginTop: '30px', width: '100%', padding: '12px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    Save Changes
                </button>
            )}
            
            {!isEditing && <button onClick={() => setView('home')} style={{ marginTop: '20px' }}>Back to Home</button>}
          </div>
        )}



        {/* VIEW: ORDERS */}
        {view === 'orders' && (
        <div style={{ maxWidth: '850px', margin: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0 }}>My Order History</h2>
            <button onClick={() => setView('home')} style={{ padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', border: '1px solid #ccc' }}>Back to Home</button>
            </div>

            {orders.length > 0 ? orders.map(o => (
            <div key={o.order_id} style={{ backgroundColor: '#fff', padding: '20px', marginBottom: '20px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', borderLeft: '6px solid #e74c3c' }}>
                
                {/* Top Row: Restaurant & Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
                <div>
                    <h3 style={{ margin: 0, color: '#2c3e50' }}>{o.restaurant_name}</h3>
                    <span style={{ fontSize: '12px', color: '#95a5a6' }}>Order #{o.order_id} • {new Date(o.order_time).toLocaleString()}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#27ae60' }}>₹{parseFloat(o.total_amount).toFixed(2)}</div>
                    <span style={{ fontSize: '12px', padding: '2px 8px', backgroundColor: '#f39c12', color: '#fff', borderRadius: '4px', fontWeight: 'bold' }}>{o.order_status}</span>
                </div>
                </div>

                {/* Middle Row: Items */}
                <div style={{ padding: '15px 0' }}>
                <strong style={{ fontSize: '13px', color: '#7f8c8d' }}>ITEMS:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                    {o.food_items ? o.food_items.split(' | ').map((item, idx) => (
                    <span key={idx} style={{ backgroundColor: '#f1f2f6', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', border: '1px solid #dfe4ea' }}>
                        {item}
                    </span>
                    )) : <span style={{ color: '#999' }}>Details not available</span>}
                </div>
                </div>

                {/* Bottom Row: Payment & Delivery Location */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', paddingTop: '12px', borderTop: '1px solid #eee', fontSize: '13px' }}>
                <div>
                    <strong style={{ color: '#7f8c8d' }}>PAYMENT:</strong>
                    <div style={{ marginTop: '4px' }}>
                        {o.payment_mode || 'N/A'} — <span style={{ color: o.payment_status === 'SUCCESS' ? '#27ae60' : '#e74c3c' }}>{o.payment_status}</span>
                    </div>
                </div>
                <div>
                    <strong style={{ color: '#7f8c8d' }}>DELIVERED TO:</strong>
                    <div style={{ marginTop: '4px' }}>
                        {o.house_no}, {o.street}, {o.delivery_city} - {o.pincode}
                    </div>
                </div>
                </div>

            </div>
            )) : (
            <div style={{ textAlign: 'center', padding: '60px', backgroundColor: '#fff', borderRadius: '12px' }}>
                <p style={{ color: '#7f8c8d', fontSize: '18px' }}>You haven't placed any orders yet.</p>
                <button onClick={() => setView('home')} style={{ marginTop: '15px', padding: '10px 25px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Order Something Now</button>
            </div>
            )}
        </div>
        )}
                  
      </div>
    </div>
  );
}

export default CustomerDashboard;