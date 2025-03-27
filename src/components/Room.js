import React, { useState, useEffect } from 'react';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';

function Room({ roomId, user }) {
  const [token, setToken] = useState('');
  const [error, setError] = useState(null);

  const getToken = async (identity, roomName) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          identity: identity || 'Anonymous', 
          roomName: roomName 
        }),
      });

      if (!response.ok) {
        throw new Error(`Token request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.token;
    } catch (error) {
      setError(error.message);
      return null;
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      if (roomId && user) {
        const livekitToken = await getToken(user.name, roomId);
        if (livekitToken) {
          setToken(livekitToken);
        }
      }
    };
    fetchToken();
  }, [roomId, user]);

  if (!user) {
    return <div style={styles.center}>Please log in to join the room</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  if (!token) {
    return <div style={styles.center}>Connecting...</div>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Room: {roomId}</h2>
        <LiveKitRoom
          serverUrl={process.env.REACT_APP_LIVEKIT_SERVER_URL}
          token={token}
          connect={true}
          audio={true}
          video={true}
        >
          <VideoConference 
            additionalProps={{
              localParticipantProps: {
                showParticipantInfo: true,
                showAudioMutedIndicator: true,
                showVideoMutedIndicator: true,
              }
            }}
          />
        </LiveKitRoom>
      </div>
    </div>
  );
}

const styles = {
  page: { 
    padding: '20px', 
    minHeight: '100vh', 
    backgroundColor: '#f0f2f5' 
  },
  container: { 
    maxWidth: '1200px', 
    margin: '0 auto' 
  },
  title: { 
    fontSize: '24px', 
    textAlign: 'center', 
    marginBottom: '20px' 
  },
  center: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    fontSize: '18px' 
  },
  error: { 
    color: 'red', 
    textAlign: 'center', 
    padding: '20px' 
  }
};

export default Room;