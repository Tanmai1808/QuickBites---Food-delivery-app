import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API = 'http://127.0.0.1:5001';

const statusColor = (s) => {
  if (s === 'DELIVERED') return '#28a745';
  if (s === 'OUT_FOR_DELIVERY') return '#007bff';
  if (s === 'PREPARING') return '#fd7e14';
  return '#6c757d';
};

const stars = (rating) => {
  const r = Math.round(rating || 0);
  return '★'.repeat(r) + '☆'.repeat(5 - r);
};

export default function DeliveryDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home');
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [ratingData, setRatingData] = useState(null);
  const [myOrders, setMyOrders] = useState([]);
  const [availableOrders, setAvailableOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (!saved) { navigate('/login'); return; }
    const u = JSON.parse(saved);
    setUser(u);
    const mId = u.member_id || u.id;
    loadAll(mId);
  }, [navigate]);

  const loadAll = (mId) => {
    fetchProfile(mId);
    fetchMyOrders(mId);
    fetchAvailableOrders();
    fetchReviews(mId);
  };

  const fetchProfile = async (mId) => {
    try {
      const res = await fetch(`${API}/api/delivery/profile/${mId}`);
      const data = await res.json();
      if (data.status === 'success') {
        setProfile(data.data);
        setStats(data.stats);
        setRatingData(data.rating);
        setIsOnline(data.data?.isOnline === 1);
        setFormData({
          name: data.data?.name || '',
          contact_number: data.data?.contact_number || '',
          dateOfBirth: data.data?.dateOfBirth || '',
          vehicle_type: data.data?.vehicle_type || '',
          vehicleNumber: data.data?.vehicleNumber || '',
          licenseID: data.data?.licenseID || '',
        });
      }
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  const fetchMyOrders = async (mId) => {
    try {
      const res = await fetch(`${API}/api/delivery/orders/${mId}`);
      const data = await res.json();
      if (data.status === 'success') setMyOrders(data.data);
    } catch (e) { console.error(e); }
  };

  const fetchAvailableOrders = async () => {
    try {
      const res = await fetch(`${API}/api/delivery/available-orders`);
      const data = await res.json();
      if (data.status === 'success') setAvailableOrders(data.data);
    } catch (e) { console.error(e); }
  };

  const fetchReviews = async (mId) => {
    try {
      const res = await fetch(`${API}/api/delivery/reviews/${mId}`);
      const data = await res.json();
      if (data.status === 'success') setReviews(data.data);
    } catch (e) { console.error(e); }
  };

  const handleAccept = async (deliveryId) => {
    const mId = user?.member_id || user?.id;
    const res = await fetch(`${API}/api/delivery/accept/${deliveryId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ member_id: mId })
    });
    const data = await res.json();
    alert(data.message);
    if (data.status === 'success') { fetchMyOrders(mId); fetchAvailableOrders(); }
  };

  const handleStatusChange = async (deliveryId, newStatus) => {
    const mId = user?.member_id || user?.id;
    const res = await fetch(`${API}/api/delivery/update-status/${deliveryId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    const data = await res.json();
    alert(data.message);
    if (data.status === 'success') { fetchMyOrders(mId); fetchProfile(mId); }
  };

  const handleToggleOnline = async () => {
    const mId = user?.member_id || user?.id;
    await fetch(`${API}/api/delivery/toggle-status/${mId}`, { method: 'POST' });
    setIsOnline(p => !p);
    fetchAvailableOrders();
  };

  const handleSaveProfile = async () => {
    const mId = user?.member_id || user?.id;
    const res = await fetch(`${API}/api/delivery/profile/update/${mId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    alert(data.message);
    if (data.status === 'success') { setIsEditing(false); fetchProfile(mId); }
  };

  const handleLogout = () => { localStorage.clear(); navigate('/login'); };

  // ── styles ────────────────────────────────────────────────────────────────
  const navStyle = {
    backgroundColor: '#1a1a2e', padding: '0 28px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '62px',
    position: 'sticky', top: 0, zIndex: 100
  };
  const logoStyle = { color: '#e94560', fontSize: '21px', fontWeight: '700', letterSpacing: '-0.5px' };
  const navBtn = (active) => ({
    padding: '7px 18px', border: 'none', borderRadius: '20px', cursor: 'pointer',
    fontSize: '14px', fontWeight: '500',
    backgroundColor: active ? '#e94560' : 'transparent',
    color: active ? 'white' : '#bbb',
  });
  const logoutBtn = {
    padding: '7px 16px', border: '1px solid #e94560', borderRadius: '20px',
    cursor: 'pointer', backgroundColor: 'transparent', color: '#e94560', fontSize: '14px'
  };
  const body = { padding: '24px', maxWidth: '920px', margin: '0 auto', backgroundColor: '#f0f2f5', minHeight: 'calc(100vh - 62px)' };
  const card = { backgroundColor: 'white', borderRadius: '14px', padding: '22px', marginBottom: '18px', boxShadow: '0 2px 10px rgba(0,0,0,0.07)' };
  const sectionTitle = { fontSize: '17px', fontWeight: '600', color: '#1a1a2e', marginBottom: '16px', marginTop: 0 };
  const statGrid = { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginTop: '16px' };
  const statBox = (bg) => ({ backgroundColor: bg, borderRadius: '12px', padding: '16px', textAlign: 'center' });
  const statNum = { fontSize: '26px', fontWeight: '700', color: '#1a1a2e' };
  const statLabel = { fontSize: '12px', color: '#666', marginTop: '4px' };
  const orderCard = { border: '1px solid #e9ecef', borderRadius: '12px', padding: '16px', marginBottom: '12px' };
  const badge = (color) => ({
    padding: '3px 11px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
    backgroundColor: color + '22', color: color, display: 'inline-block'
  });
  const btn = (bg, color = 'white') => ({
    padding: '8px 20px', backgroundColor: bg, color, border: 'none',
    borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px'
  });
  const inputStyle = {
    width: '100%', padding: '9px 12px', borderRadius: '8px',
    border: '1px solid #dee2e6', fontSize: '14px', marginBottom: '10px', boxSizing: 'border-box'
  };
  const labelStyle = { fontSize: '13px', color: '#666', marginBottom: '4px', display: 'block' };
  const emptyMsg = { textAlign: 'center', color: '#aaa', padding: '40px 0', fontSize: '15px' };
  const infoRow = { fontSize: '14px', color: '#555', marginBottom: '5px' };
  const profileRow = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 0', borderBottom: '1px solid #f0f2f5', fontSize: '15px'
  };

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px', color: '#555' }}>
      Loading...
    </div>
  );

  const mId = user?.member_id || user?.id;
  const activeOrders = myOrders.filter(o => o.delivery_status !== 'DELIVERED');
  const completedOrders = myOrders.filter(o => o.delivery_status === 'DELIVERED');

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>

      {/* ── NAVBAR ── */}
      <nav style={navStyle}>
        <span style={logoStyle}>🛵 DeliveryHub</span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['home', 'orders', 'reviews', 'earnings', 'profile'].map(v => (
            <button key={v} style={navBtn(view === v)} onClick={() => setView(v)}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
        <button style={logoutBtn} onClick={handleLogout}>Logout</button>
      </nav>

      <div style={body}>

        {/* ══════════════════ HOME ══════════════════ */}
        {view === 'home' && (
          <>
            {/* Welcome + status */}
            <div style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ margin: '0 0 6px', fontSize: '22px' }}>Hey, {profile?.name} 👋</h2>
                  <span style={{
                    padding: '4px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600',
                    backgroundColor: isOnline ? '#d4edda' : '#f8d7da',
                    color: isOnline ? '#155724' : '#721c24'
                  }}>
                    {isOnline ? '🟢 Online' : '🔴 Offline'}
                  </span>
                </div>
                <button
                  style={btn(isOnline ? '#dc3545' : '#28a745')}
                  onClick={handleToggleOnline}
                >
                  {isOnline ? 'Go Offline' : 'Go Online'}
                </button>
              </div>

              <div style={statGrid}>
                <div style={statBox('#fff3cd')}>
                  <div style={statNum}>{activeOrders.length}</div>
                  <div style={statLabel}>Active Orders</div>
                </div>
                <div style={statBox('#d4edda')}>
                  <div style={statNum}>{stats?.total_deliveries || 0}</div>
                  <div style={statLabel}>Delivered</div>
                </div>
                <div style={statBox('#cce5ff')}>
                  <div style={statNum}>₹{parseFloat(stats?.total_earnings || 0).toFixed(0)}</div>
                  <div style={statLabel}>Total Earned</div>
                </div>
                <div style={statBox('#e2d9f3')}>
                  <div style={statNum}>{ratingData?.avg_rating || '—'}</div>
                  <div style={statLabel}>Avg Rating</div>
                </div>
              </div>
            </div>

            {/* Available Orders (only when online) */}
            {isOnline && (
              <div style={card}>
                <p style={sectionTitle}>📦 Available Orders ({availableOrders.length})</p>
                {availableOrders.length === 0
                  ? <div style={emptyMsg}>No new orders nearby. Check back soon!</div>
                  : availableOrders.map(o => (
                    <div key={o.delivery_id} style={orderCard}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <strong>Order #{o.order_id}</strong>
                        <span style={badge('#fd7e14')}>New</span>
                      </div>
                      <div style={infoRow}>🍽 {o.food_items}</div>
                      <div style={infoRow}>🏪 Pickup: {o.restaurant_name}, {o.restaurant_city}</div>
                      <div style={infoRow}>📍 Drop: {o.house_no}, {o.street}, {o.delivery_city}</div>
                      <div style={infoRow}>👤 {o.customer_name}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                        <strong style={{ color: '#28a745', fontSize: '16px' }}>₹{parseFloat(o.total_amount).toFixed(2)}</strong>
                        <button style={btn('#28a745')} onClick={() => handleAccept(o.delivery_id)}>Accept Order</button>
                      </div>
                    </div>
                  ))
                }
              </div>
            )}

            {/* Active Orders */}
            {activeOrders.length > 0 && (
              <div style={card}>
                <p style={sectionTitle}>🚴 My Active Orders ({activeOrders.length})</p>
                {activeOrders.map(o => (
                  <div key={o.delivery_id} style={orderCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <strong>Order #{o.order_id}</strong>
                      <span style={badge(statusColor(o.delivery_status))}>{o.delivery_status}</span>
                    </div>
                    <div style={infoRow}>🍽 {o.food_items}</div>
                    <div style={infoRow}>🏪 {o.restaurant_name}, {o.restaurant_city}</div>
                    <div style={infoRow}>📍 {o.house_no}, {o.street}, {o.delivery_city}</div>
                    <div style={infoRow}>👤 {o.customer_name} &nbsp;|&nbsp; 📞 {o.customer_phone}</div>
                    <div style={infoRow}>💳 {o.payment_mode} — {o.payment_status}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                      <strong style={{ fontSize: '16px' }}>₹{parseFloat(o.total_amount).toFixed(2)}</strong>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {o.delivery_status === 'OUT_FOR_DELIVERY' && (
                          <button style={btn('#007bff')} onClick={() => handleStatusChange(o.delivery_id, 'DELIVERED')}>
                            ✓ Mark Delivered
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ══════════════════ ORDERS ══════════════════ */}
        {view === 'orders' && (
          <>
            {/* Current Orders */}
            <div style={card}>
              <p style={sectionTitle}>🚴 Current Orders ({activeOrders.length})</p>
              {activeOrders.length === 0
                ? <div style={emptyMsg}>No active orders right now.</div>
                : activeOrders.map(o => (
                  <div key={o.delivery_id} style={orderCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <strong>Order #{o.order_id}</strong>
                      <span style={badge(statusColor(o.delivery_status))}>{o.delivery_status}</span>
                    </div>
                    <div style={infoRow}>🍽 {o.food_items}</div>
                    <div style={infoRow}>🏪 {o.restaurant_name}, {o.restaurant_city}</div>
                    <div style={infoRow}>📍 {o.house_no}, {o.street}, {o.delivery_city}</div>
                    <div style={infoRow}>👤 {o.customer_name} &nbsp;|&nbsp; 📞 {o.customer_phone}</div>
                    <div style={infoRow}>🕐 {new Date(o.order_time).toLocaleString()}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                      <strong>₹{parseFloat(o.total_amount).toFixed(2)}</strong>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', color: '#888' }}>Change status:</span>
                        <select
                          defaultValue={o.delivery_status}
                          onChange={(e) => handleStatusChange(o.delivery_id, e.target.value)}
                          style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #dee2e6', fontSize: '14px', cursor: 'pointer' }}
                        >
                          <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                          <option value="DELIVERED">Delivered</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>

            {/* Previous Orders */}
            <div style={card}>
              <p style={sectionTitle}>✅ Previous Orders ({completedOrders.length})</p>
              {completedOrders.length === 0
                ? <div style={emptyMsg}>No completed deliveries yet.</div>
                : completedOrders.map(o => (
                  <div key={o.delivery_id} style={orderCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <strong>Order #{o.order_id}</strong>
                      <span style={badge('#28a745')}>Delivered</span>
                    </div>
                    <div style={infoRow}>🍽 {o.food_items}</div>
                    <div style={infoRow}>🏪 {o.restaurant_name}</div>
                    <div style={infoRow}>📍 {o.house_no}, {o.street}, {o.delivery_city}</div>
                    <div style={infoRow}>👤 {o.customer_name}</div>
                    <div style={infoRow}>🕐 {new Date(o.order_time).toLocaleString()}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                      <span style={{ color: '#555' }}>Order: ₹{parseFloat(o.total_amount).toFixed(2)}</span>
                      <strong style={{ color: '#28a745' }}>Earned: ₹{(parseFloat(o.total_amount) * 0.1).toFixed(2)}</strong>
                    </div>
                  </div>
                ))
              }
            </div>
          </>
        )}

        {/* ══════════════════ REVIEWS ══════════════════ */}
        {view === 'reviews' && (
          <div style={card}>
            <p style={sectionTitle}>⭐ My Ratings & Reviews</p>

            {/* Rating summary */}
            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fffbf0', borderRadius: '12px', marginBottom: '20px' }}>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#fd7e14' }}>
                {ratingData?.avg_rating || '—'}
              </div>
              <div style={{ fontSize: '24px', color: '#fd7e14', marginBottom: '6px' }}>
                {stars(ratingData?.avg_rating)}
              </div>
              <div style={{ color: '#888', fontSize: '14px' }}>
                Based on {ratingData?.total_reviews || 0} reviews
              </div>
            </div>

            {reviews.length === 0
              ? <div style={emptyMsg}>No reviews yet. Complete deliveries to get rated!</div>
              : reviews.map(r => (
                <div key={r.delivery_review_id} style={{ ...orderCard, marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong>{r.customer_name}</strong>
                    <span style={{ color: '#fd7e14', fontSize: '16px' }}>{stars(r.rating)}</span>
                  </div>
                  {r.comments && <div style={{ color: '#555', fontSize: '14px', marginBottom: '6px', fontStyle: 'italic' }}>"{r.comments}"</div>}
                  <div style={{ fontSize: '12px', color: '#aaa' }}>
                    Order #{r.order_id} &nbsp;·&nbsp; {r.review_time ? new Date(r.review_time).toLocaleDateString() : ''}
                  </div>
                </div>
              ))
            }
          </div>
        )}

        {/* ══════════════════ EARNINGS ══════════════════ */}
        {view === 'earnings' && (
          <div style={card}>
            <p style={sectionTitle}>💰 Earnings Summary</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
              <div style={statBox('#d4edda')}>
                <div style={statNum}>₹{parseFloat(stats?.total_earnings || 0).toFixed(0)}</div>
                <div style={statLabel}>Total Earned</div>
              </div>
              <div style={statBox('#cce5ff')}>
                <div style={statNum}>{stats?.total_deliveries || 0}</div>
                <div style={statLabel}>Deliveries Done</div>
              </div>
            </div>
            <p style={{ color: '#888', fontSize: '13px', textAlign: 'center', marginBottom: '20px' }}>
              You earn 10% of each order value as your delivery fee.
            </p>

            <p style={sectionTitle}>Completed Delivery History</p>
            {completedOrders.length === 0
              ? <div style={emptyMsg}>No completed deliveries yet.</div>
              : completedOrders.map(o => (
                <div key={o.delivery_id} style={orderCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <strong>Order #{o.order_id}</strong>
                    <span style={{ fontSize: '12px', color: '#888' }}>{new Date(o.order_time).toLocaleDateString()}</span>
                  </div>
                  <div style={infoRow}>🏪 {o.restaurant_name} → 📍 {o.delivery_city}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                    <span style={{ color: '#555', fontSize: '14px' }}>Order total: ₹{parseFloat(o.total_amount).toFixed(2)}</span>
                    <strong style={{ color: '#28a745' }}>+₹{(parseFloat(o.total_amount) * 0.1).toFixed(2)}</strong>
                  </div>
                </div>
              ))
            }
          </div>
        )}

        {/* ══════════════════ PROFILE ══════════════════ */}
        {view === 'profile' && (
          <div style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <p style={{ ...sectionTitle, marginBottom: 0 }}>👤 My Profile</p>
              {!isEditing
                ? <button style={btn('#007bff')} onClick={() => setIsEditing(true)}>Edit Profile</button>
                : <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={btn('#28a745')} onClick={handleSaveProfile}>Save Changes</button>
                    <button style={btn('#6c757d')} onClick={() => setIsEditing(false)}>Cancel</button>
                  </div>
              }
            </div>

            {!isEditing ? (
              // View mode
              <>
                <div style={profileRow}><span style={{ color: '#888' }}>Name</span><span>{profile?.name}</span></div>
                <div style={profileRow}><span style={{ color: '#888' }}>Email</span><span>{profile?.email}</span></div>
                <div style={profileRow}><span style={{ color: '#888' }}>Phone</span><span>{profile?.contact_number}</span></div>
                <div style={profileRow}><span style={{ color: '#888' }}>Date of Birth</span><span>{profile?.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'N/A'}</span></div>
                <div style={profileRow}><span style={{ color: '#888' }}>Username</span><span>{profile?.username || 'N/A'}</span></div>
                <div style={profileRow}><span style={{ color: '#888' }}>Vehicle Type</span><span>{profile?.vehicle_type}</span></div>
                <div style={profileRow}><span style={{ color: '#888' }}>Vehicle Number</span><span>{profile?.vehicleNumber}</span></div>
                <div style={profileRow}><span style={{ color: '#888' }}>License ID</span><span>{profile?.licenseID}</span></div>
                <div style={{ ...profileRow, border: 'none' }}>
                  <span style={{ color: '#888' }}>Status</span>
                  <span style={{
                    padding: '4px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600',
                    backgroundColor: isOnline ? '#d4edda' : '#f8d7da',
                    color: isOnline ? '#155724' : '#721c24'
                  }}>
                    {isOnline ? '🟢 Online' : '🔴 Offline'}
                  </span>
                </div>
              </>
            ) : (
              // Edit mode
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                {[
                  { label: 'Full Name', key: 'name', type: 'text' },
                  { label: 'Phone Number', key: 'contact_number', type: 'text' },
                  { label: 'Date of Birth', key: 'dateOfBirth', type: 'date' },
                  { label: 'Vehicle Number', key: 'vehicleNumber', type: 'text' },
                  { label: 'License ID', key: 'licenseID', type: 'text' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={labelStyle}>{f.label}</label>
                    <input
                      type={f.type}
                      value={formData[f.key] || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, [f.key]: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                ))}
                <div>
                  <label style={labelStyle}>Vehicle Type</label>
                  <select
                    value={formData.vehicle_type || 'BIKE'}
                    onChange={(e) => setFormData(prev => ({ ...prev, vehicle_type: e.target.value }))}
                    style={inputStyle}
                  >
                    <option value="BIKE">Bike</option>
                    <option value="SCOOTER">Scooter</option>
                    <option value="BICYCLE">Bicycle</option>
                    <option value="CAR">Car</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}