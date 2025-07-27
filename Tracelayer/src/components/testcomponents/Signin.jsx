import React, { useState } from 'react';
import api from '../../services/api';

export default function Signin() {
const [form, setForm] = useState({ email: '', password: '' });

  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
     const res = await api.post('/api/signin', form);
      // localStorage.setItem('token', res.data.token);
      // localStorage.setItem('appId', res.data.appId);
      // localStorage.setItem('apiKey', res.data.apiKey);
      setMsg('Login successful');

    } catch (err) {
      setMsg(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Signin Tracelayer</h2>
      <form onSubmit={handleSignin}>
       <input name="username" onChange={handleChange} placeholder="Username" required />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
