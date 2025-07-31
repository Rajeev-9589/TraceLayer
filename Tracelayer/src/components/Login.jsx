import React, { useState } from 'react';
import api from '../services/api';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/login-Dev', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('appId', res.data.appId);
      localStorage.setItem('apiKey', res.data.apiKey);
      setMsg('Login successful');
      setTimeout(() => navigate('/Dashboard'), 1000);
    } catch (err) {
      setMsg(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 via-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Developer Login</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition"
          >
            Log In
          </Button>
        </form>

        {msg && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-4 text-center text-sm ${
              msg === 'Login successful' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-indigo-600 hover:underline font-medium"
            >
              Register here
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
