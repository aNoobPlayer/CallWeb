import React from 'react';
import { useParams } from 'react-router-dom';
import Room from '../components/Room';

function RoomPage({ user }) {
  const { roomId } = useParams();

  if (!user) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Vui lòng đăng nhập để tham gia phòng!</h2>
      </div>
    );
  }

  return <Room roomId={roomId} user={user} />;
}

export default RoomPage;