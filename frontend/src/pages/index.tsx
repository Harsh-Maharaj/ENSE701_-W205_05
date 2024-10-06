import LoginForm from '../components/forms/login'; // Adjust the path as needed
import RegisterForm from '../components/forms/register'; // Adjust the path as needed

export default function Home() {
  return (
    <div className="container">
      <h1>Software Practice Empirical Evidence Database (SPEED)</h1>

      {/* Render Login Form */}
      <h2>Login</h2>
      <LoginForm />

      {/* Render Register Form */}
      <h2>Register</h2>
      <RegisterForm />
    </div>
  );
}
