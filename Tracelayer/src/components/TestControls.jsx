import React from 'react';
import axios from 'axios';
const TestControls = () => {
  const simulateBruteForce = async () => {
    for (let i = 0; i < 6; i++) {
      await axios.post('http://localhost:5500/signin', {
        username: 'testuser',
        password: 'wrongpass',
      });
    }
    alert('Simulated 6 failed login attempts.');
  };

  const simulateHighRate = async () => {
    for (let i = 0; i < 30; i++) {
      await axios.get('http://localhost:5500/fakeapi');
    }
    alert('Simulated 20 rapid requests.');
  };

  return (
    <div className="border p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-3">🧪 Test Controls</h2>
      <button
        onClick={simulateBruteForce}
        className="block w-full mb-3 bg-red-600 text-white px-4 py-2 rounded"
      >
        Simulate Brute-force
      </button>
      <button
        onClick={simulateHighRate}
        className="block w-full bg-yellow-600 text-white px-4 py-2 rounded"
      >
        Simulate Rate-limit
      </button>
    </div>
  );
};

export default TestControls;