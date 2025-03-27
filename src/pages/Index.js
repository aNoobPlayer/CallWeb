import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Thêm thư viện uuid để tạo ID ngẫu nhiên

function Index({ user, setUser }) {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  // Xử lý vào phòng với ID nhập tay
  const handleJoinRoom = () => {
    if (!user) {
      alert('Vui lòng đăng nhập để tham gia phòng!');
      return;
    }
    if (!roomId.trim()) {
      alert('Vui lòng nhập ID phòng!');
      return;
    }
    navigate(`/room/${roomId}`);
  };

  // Tạo phòng mới với ID ngẫu nhiên
  const handleCreateRoom = () => {
    if (!user) {
      alert('Vui lòng đăng nhập để tạo phòng!');
      return;
    }
    const newRoomId = uuidv4().split('-')[0]; // Lấy phần đầu của UUID làm ID ngắn gọn
    navigate(`/room/${newRoomId}`);
  };

  return (
    <div className="index-page" style={styles.page}>
      <div className="container">
        <h1 style={styles.title}>Chào mừng đến với VideoCall Pro</h1>
        <p style={styles.subtitle}>Kết nối dễ dàng, giao tiếp hiệu quả</p>
        {user ? (
          <div style={styles.form}>
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Nhập ID phòng"
              style={styles.input}
            />
            <button onClick={handleJoinRoom} style={styles.button}>
              Tham gia phòng
            </button>
            <button onClick={handleCreateRoom} style={styles.createButton}>
              Tạo phòng mới
            </button>
          </div>
        ) : (
          <p style={styles.loginPrompt}>Vui lòng đăng nhập để tiếp tục!</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    textAlign: 'center',
    padding: '50px 0',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  title: {
    fontSize: '36px',
    color: '#333',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    alignItems: 'center',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '200px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  createButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  loginPrompt: {
    fontSize: '18px',
    color: '#ff4d4f',
  },
};

export default Index;