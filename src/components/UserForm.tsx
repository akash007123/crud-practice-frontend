import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { api } from '../services/api';
import { UserFormData } from '../types/User';

const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    gender: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadUser();
    }
  }, [id]);

  const loadUser = async () => {
    try {
      const user = await api.getUser(id!);
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        jobTitle: user.jobTitle || '',
        gender: user.gender,
      });
      if (user.profileImage) {
        setPreviewImage(user.profileImage);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed');
        return;
      }
      setFormData(prev => ({ ...prev, profileImage: file }));
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(''); // Clear any previous errors
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (id) {
        await api.updateUser(id, formData);
      } else {
        await api.createUser(formData);
      }
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>{id ? 'Edit User' : 'Add New User'}</h2>
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
          <Form.Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Form.Text className="text-muted">
            Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
          </Form.Text>
          {previewImage && (
            <div className="mt-3">
              <img
                src={previewImage}
                alt="Profile preview"
                style={{ 
                  maxWidth: '300px', 
                  maxHeight: '300px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                className="img-thumbnail"
              />
            </div>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
        <Button
          variant="secondary"
          className="ms-2"
          onClick={() => navigate('/')}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default UserForm;