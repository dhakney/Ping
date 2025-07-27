import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [snaps, setSnaps] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/profile/${userId}`, {
          headers: {
            Authorization: token,
          },
        });

        if (response.ok) {
          const { user, snaps } = await response.json();
          setUser(user);
          setSnaps(snaps);
        } else {
          console.error('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{user.username}'s Profile</h2>
      <p>Email: {user.email}</p>
      <h3>Snaps:</h3>
      <ul>
        {snaps.map((snap) => (
          <li key={snap.id}>
            <img src={snap.image_url} alt={snap.caption} />
            <p>{snap.caption}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
