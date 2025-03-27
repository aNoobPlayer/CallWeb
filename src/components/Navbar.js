import React from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Navbar({ user, setUser }) {
  const handleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      setUser(decoded);
    } catch (error) {
    }
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
  };

  return (
    <nav className="navbar" style={styles.navbar}>
      <div className="container" style={styles.container}>
        <Link to="/" style={styles.logo}>VideoCall Pro</Link>
        <div>
          {user ? (
            <>
              <span style={styles.user}>Xin chào, {user.name}</span>
              <button onClick={handleLogout} style={styles.button}>Đăng xuất</button>
            </>
          ) : (
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => {}}
              theme="outline"
              size="large"
            />
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: { backgroundColor: '#007bff', padding: '10px 0', color: 'white' },
  container: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: '24px', fontWeight: 'bold', color: 'white', textDecoration: 'none' },
  user: { marginRight: '10px' },
  button: { backgroundColor: '#ff4d4f', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' },
};

export default Navbar;