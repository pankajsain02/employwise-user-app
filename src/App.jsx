import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UserList from './pages/UserList';
import EditUser from './pages/EditUser';
import { useEffect, useState } from 'react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!token ? <Login setToken={setToken} /> : <Navigate to="/users" />} />
        <Route path="/users" element={token ? <UserList /> : <Navigate to="/" />} />
        <Route path="/edit/:id" element={token ? <EditUser /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
