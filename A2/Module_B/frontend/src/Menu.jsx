import { useState, useEffect } from 'react'

function Menu() {
  const [menuItems, setMenuItems] = useState([]);

  // 1. Get user data from local storage
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;
  const role = user ? user.roleName : 'customer';

  useEffect(() => {
    fetch('http://127.0.0.1:5001/api/menu')
      .then(response => response.json()) 
      .then(data => {
        if (data.status === 'success') {
          setMenuItems(data.data);
        }
      })
      .catch(error => console.error("Error connecting to backend:", error));
  }, []);

  // 2. Logout function
  const handleLogout = () => {
    localStorage.clear(); // Wipe the token and user info
    window.location.href = '/login'; // Redirect to login
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h1>🍽️ My Restaurant</h1>
        <button 
          onClick={handleLogout}
          style={{ padding: '8px 16px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>

      <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '30px', borderLeft: '5px solid #007BFF' }}>
        <p style={{ margin: 0 }}>Welcome back, <strong>{user?.name || 'User'}</strong>!</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>Role: <span style={{ color: '#007BFF', fontWeight: 'bold' }}>{role}</span></p>
      </div>

      {/* ROLE-BASED ACTION BAR */}
      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        {role === 'RestaurantOwner' && (
          <button style={{ padding: '12px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            + Add New Dish
          </button>
        )}

        {role === 'Admin' && (
          <button style={{ padding: '12px 20px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            ⚙️ System Settings
          </button>
        )}

        {role === 'DeliveryPartner' && (
          <button style={{ padding: '12px 20px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            📦 View Assigned Orders
          </button>
        )}
      </div>

      <hr />
      <h2>Menu</h2>
      
      {menuItems.length === 0 ? (
        <p>Loading delicious food...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {menuItems.map(item => (
            <div key={item.item_id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 5px 0' }}>{item.item_name}</h3>
                <p style={{ margin: 0, color: 'green', fontWeight: 'bold' }}>₹{item.price}</p>
                {item.availability === 0 && (
                  <p style={{ color: 'red', margin: '5px 0 0 0', fontSize: '12px' }}>Currently out of stock</p>
                )}
              </div>
              
              {/* Conditional button: Customers order, Owners edit */}
              {role === 'customer' ? (
                <button style={{ padding: '8px 15px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Add to Cart
                </button>
              ) : role === 'RestaurantOwner' ? (
                <button style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Edit Item
                </button>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Menu;