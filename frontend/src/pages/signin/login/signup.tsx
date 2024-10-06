// frontend/src/pages/signin_login/signup.tsx
import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', formData);
      console.log(response.data);
      // Redirect to login page or home after successful signup
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" onChange={handleChange} placeholder="Username" required />
      <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
      <select name="role" onChange={handleChange}>
        <option value="user">Normal User</option>
        <option value="moderator">Moderator</option>
        <option value="analyst">Analyst</option>
        <option value="administrator">Administrator</option>
      </select>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
