import axios from 'axios';
import React from 'react';

export default function Dashboard() {
  const appId = localStorage.getItem('appId');
  const apiKey = localStorage.getItem('apiKey');

  const testnow = async () => {
  const apiKey = localStorage.getItem('apiKey');
  for (let i = 1; i <= 30; i++) {
    try {
      const res = await axios.get('http://localhost:5500/api/fakeapi', {
        headers: {
          'x-api-key': apiKey
        }
      });
      console.log(`✅ Request ${i}:`, res.data);
    } catch (err) {
      console.error(`❌ Request ${i}:`, err.response?.data || err.message);
    }
  }
};

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={testnow}>Test me</button>
      <p><strong>App ID:</strong> {appId}</p>
      <p><strong>API Key:</strong> {apiKey}</p>
    </div>
  );
}
