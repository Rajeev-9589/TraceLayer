import React, { useState } from 'react';
import axios from 'axios';
import api from '../../services/api';

function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    // email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('http://localhost:5500/api/signup', formData);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      {/* <input 
        type="text" 
        name="username" 
        placeholder="Username" 
        value={formData.username} 
        onChange={handleChange} 
        required 
      /><br/> */}
      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        value={formData.email} 
        onChange={handleChange} 
        required 
      /><br/>
      <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        value={formData.password} 
        onChange={handleChange} 
        required 
      /><br/>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
