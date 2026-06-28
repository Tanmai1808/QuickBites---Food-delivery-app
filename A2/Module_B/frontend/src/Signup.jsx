import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  
  // Basic State
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [restaurantName, setRestaurantName] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');

  // Role-Specific State
  const [dob, setDob] = useState(''); // Changed from age to Date of Birth
  const [vehicleType, setVehicleType] = useState('BIKE');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [licenseID, setLicenseID] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // IMPORTANT: Adding the new fields to the package we send to Python
    const userData = { 
        name, username, email, contactNumber, password, role, dob,
        restaurantName, addressLine, city, zipCode // Add these!
    };

    try {
      const response = await fetch('http://127.0.0.1:5001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        alert('Account created successfully!');
        navigate('/login'); 
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Failed to connect to server.");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f4f4', padding: '20px' }}>
      <form onSubmit={handleSignup} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '12px', width: '350px' }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>Create Account</h2>
        
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '10px' }} />
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ padding: '10px' }} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '10px' }} />
        <input type="tel" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required style={{ padding: '10px' }} />
        
        {/* NEW: Date of Birth Picker instead of Age */}
        <label style={{ fontSize: '12px', color: '#666' }}>Date of Birth:</label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required style={{ padding: '10px' }} />

        <label style={{ fontSize: '12px', color: '#666' }}>Register as:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ padding: '10px' }}>
            <option value="customer">Customer</option>
            <option value="RestaurantOwner">Restaurant Owner</option>
            <option value="DeliveryPartner">Delivery Partner</option> 
        </select>

        {/* Dynamic Delivery Partner Fields */}
        {role === 'DeliveryPartner' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px', backgroundColor: '#eef', borderRadius: '5px' }}>
                <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} style={{ padding: '8px' }}>
                    <option value="BIKE">Bike</option>
                    <option value="SCOOTER">Scooter</option>
                    <option value="CAR">Car</option>
                </select>
                <input type="text" placeholder="Vehicle Number" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} style={{ padding: '8px' }} required />
                <input type="text" placeholder="License ID" value={licenseID} onChange={(e) => setLicenseID(e.target.value)} style={{ padding: '8px' }} required />
             </div>
        )}

        {role === 'RestaurantOwner' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px', border: '1px solid #ffeeba' }}>
            <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Store Information:</label>
            <input type="text" placeholder="Restaurant Name" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} required style={{ padding: '8px' }} />
            <input type="text" placeholder="Address (e.g., Street Name)" value={addressLine} onChange={(e) => setAddressLine(e.target.value)} required style={{ padding: '8px' }} />
            <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required style={{ padding: '8px', flex: 2 }} />
                <input type="text" placeholder="Zip (6 digits)" maxLength="6" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required style={{ padding: '8px', flex: 1 }} />
            </div>
        </div>
        )}

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '10px' }} />
        
        <button type="submit" style={{ padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Sign Up</button>

        <p style={{ textAlign: 'center', fontSize: '14px' }}>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;