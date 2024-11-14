import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const response = await fetch('https://api.example.com/users');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="loader">Loading users...</div>;
  }

  if (error) {
    return <div className="error">Failed to load users: {error}</div>;
  }

  return (
    <div className="user-list">
      <h2>User Directory</h2>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            <strong>{user.name}</strong> &lt;{user.email}&gt;
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
