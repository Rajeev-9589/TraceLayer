import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LockedUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchLockedUsers = async () => {
    const res = await axios.get('http://localhost:5500/locked-users');
    setUsers(res.data);
  };

  const unlockUser = async (userId) => {
    await axios.post('http://localhost:5500/unlock-user', { userId });
    fetchLockedUsers();
  };

  useEffect(() => {
    fetchLockedUsers();
  }, []);

  return (
    <div className="border p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-3">🔒 Locked Users</h2>
      {users.map((user) => (
        <div key={user._id} className="border p-2 mb-2 rounded">
          <p><strong>{user.username}</strong></p>
          <p>Reason: {user.lockReason || 'Too many failed attempts'}</p>
          <button
            onClick={() => unlockUser(user._id)}
            className="mt-2 text-sm px-3 py-1 bg-green-600 text-white rounded"
          >
            Unlock
          </button>
        </div>
      ))}
    </div>
  );
};

export default LockedUsers;