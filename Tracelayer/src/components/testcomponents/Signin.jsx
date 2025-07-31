import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import api from '../../services/api';

export default function Signin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/signin', form);
      setMsg('Login successful');
      // Add navigation or logic here if needed
    } catch (err) {
      setMsg(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-sm mx-auto mt-24 p-6 bg-white border rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">SignIn</h2>

      <form onSubmit={handleSignin} className="space-y-4">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>

      {msg && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-4 text-center ${
            msg === 'Login successful' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {msg}
        </motion.p>
      )}
    </motion.div>
  );
}
