import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`https://reqres.in/api/users/${id}`);
      setUser(res.data.data);
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`https://reqres.in/api/users/${id}`, user);
    navigate('/users');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white p-8 shadow-md rounded" onSubmit={handleUpdate}>
        <h2 className="text-xl mb-4">Edit User</h2>
        <input type="text" value={user.first_name} onChange={e => setUser({ ...user, first_name: e.target.value })} className="border p-2 w-full mb-2" />
        <input type="text" value={user.last_name} onChange={e => setUser({ ...user, last_name: e.target.value })} className="border p-2 w-full mb-2" />
        <input type="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} className="border p-2 w-full mb-2" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}

export default EditUser;