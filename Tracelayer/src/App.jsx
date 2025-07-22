// App.jsx
import React from 'react';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">🔐 TraceLayer Dashboard</h1>
      <LoginForm />
      <AdminDashboard />
    </div>
  );
}

export default App;
