import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(res.data.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">User List</h1>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/';
          }}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map(user => (
          <div key={user.id} className="border p-4 rounded shadow">
            <img src={user.avatar} alt={user.first_name} className="w-24 h-24 rounded-full mx-auto mb-2" />
            <h2 className="text-lg text-center">{user.first_name} {user.last_name}</h2>
            <div className="flex justify-around mt-2">
              <Link to={`/edit/${user.id}`} className="text-blue-500">Edit</Link>
              <button onClick={() => handleDelete(user.id)} className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} className="px-4 py-2 bg-gray-200">Previous</button>
        <button onClick={() => setPage(prev => prev + 1)} className="px-4 py-2 bg-gray-200">Next</button>
      </div>
    </div>
  );
}

export default UserList;
