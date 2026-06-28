import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("LOGIN RESPONSE:", data);

      if (data.status === 'success') {
        // Save everything to localStorage
        localStorage.setItem('token',     data.token);
        localStorage.setItem('member_id', data.user.id);
        localStorage.setItem('name',      data.user.name);
        localStorage.setItem('role',      data.user.role);
        localStorage.setItem('user',      JSON.stringify(data.user));

        const role = data.user.role.toLowerCase();

        if (role === 'customer')
          navigate('/customer-dashboard', { state: { memberId: data.user.id } });
        else if (role === 'restaurantowner')
          navigate('/owner-dashboard',    { state: { memberId: data.user.id } });
        else if (role === 'deliverypartner')
          navigate('/delivery-dashboard', { state: { memberId: data.user.id } });
        else if (role === 'admin')
          navigate('/admin-dashboard',    { state: { memberId: data.user.id } });
        else
          alert(`Unknown role: ${data.user.role}`);

      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to connect to backend");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f4' }}>
      <form onSubmit={handleLogin} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 20px 0' }}>Welcome Back</h2>

        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />

        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />

        <button type="submit"
          style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Log In
        </button>

        <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#666' }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: '#007BFF', textDecoration: 'none' }}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;