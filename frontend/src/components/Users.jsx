import { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get('http://localhost:3000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    await axios.post('http://localhost:3000/api/auth/register', { username, password, email }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers([...users, { username, email }]);
    setUsername('');
    setPassword('');
    setEmail('');
  };

  return (
    <div>
      <h1>Gestion des Utilisateurs</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Ajouter Utilisateur</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;