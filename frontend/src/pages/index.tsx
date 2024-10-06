// frontend/src/pages/index.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin_login/login'); // Redirect to login if no token
    }
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
};

export default Home;
