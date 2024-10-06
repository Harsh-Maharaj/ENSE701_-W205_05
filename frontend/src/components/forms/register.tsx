import { useState } from 'react';
import React from 'react';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Assuming default role is 'user'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', { // Replace with your backend URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log('Registered successfully:', data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('An error occurred:', (error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Password"
      />
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
        placeholder="Role"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
