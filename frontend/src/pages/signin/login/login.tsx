// frontend/src/pages/signin_login/login.tsx
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', formData);
      console.log(response.data);
      // Store token and redirect to home page
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
