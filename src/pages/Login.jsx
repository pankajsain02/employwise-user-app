import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      navigate('/users');
    } catch (err) {
      setError('Login failed. Use correct credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-sm" onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="border p-2 w-full mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="border p-2 w-full mb-3"
        />
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700">
          Login
        </button>
        <p className="mt-4 text-xs text-center text-gray-500">
          Use email: <code>eve.holt@reqres.in</code><br />
          and password: <code>cityslicka</code>
        </p>
      </form>
    </div>
  );
}

export default Login;
