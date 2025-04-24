import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { UserFormData } from '../types/User';
import { api } from '../services/api';
import { AxiosError } from 'axios';

const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    gender: '',
  });

  useEffect(() => {
    if (id) {
      loadUser();
    }
  }, [id]);

  const loadUser = async () => {
    try {
      if (!id) return;
      const user = await api.getUser(id);
      setFormData(user);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(`Failed to load user: ${err.response?.data?.message || err.message}`);
      } else {
        setError('Failed to load user: Unknown error occurred');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await api.updateUser(id, formData);
      } else {
        await api.createUser(formData);
      }
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(`Failed to save user: ${err.response?.data?.message || err.message}`);
      } else {
        setError('Failed to save user: Unknown error occurred');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container className="mt-4">
      <h2>{id ? 'Edit User' : 'Create New User'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          {id ? 'Update' : 'Create'} User
        </Button>
        <Button variant="secondary" className="ms-2" onClick={() => navigate('/')}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default UserForm;