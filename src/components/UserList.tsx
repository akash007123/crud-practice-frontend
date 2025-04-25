import  { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { User } from '../types/User';
import { api } from '../services/api';

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await api.getUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.deleteUser(id);
        setUsers(users.filter(user => user._id !== id));
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Users</h2>
        <Link to="/users/new" className="btn btn-primary">
          Add New User
        </Link>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Profile</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={`${user.firstName}'s profile`}
                    style={{ 
                      width: '100px', 
                      height: '100px', 
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100px',
                      height: '100px',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#666',
                      fontSize: '14px'
                    }}
                  >
                    No Image
                  </div>
                )}
              </td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.jobTitle}</td>
              <td>{user.gender}</td>
              <td>
                <Link to={`/users/edit/${user._id}`} className="btn btn-sm btn-info me-2">
                  Edit
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => user._id && handleDelete(user._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserList;