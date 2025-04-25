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
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed');
        return;
      }
      setFormData(prev => ({ ...prev, profileImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
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
    <Container className="py-8 px-4 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {id ? 'Edit User Profile' : 'Create New User Profile'}
        </h2>
        
        {error && (
          <Alert variant="danger" className="mb-6">
            {error}
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Group className="mb-4">
              <Form.Label className="text-sm font-medium text-gray-700">First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="text-sm font-medium text-gray-700">Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-4">
            <Form.Label className="text-sm font-medium text-gray-700">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="text-sm font-medium text-gray-700">Job Title</Form.Label>
            <Form.Control
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="text-sm font-medium text-gray-700">Gender</Form.Label>
            <Form.Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-6">
            <Form.Label className="text-sm font-medium text-gray-700">Profile Image</Form.Label>
            <div className="mt-2 flex items-center space-x-4">
              <div className="flex-1">
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Form.Text className="text-sm text-gray-500 mt-1">
                  Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
                </Form.Text>
              </div>
              {previewImage && (
                <div className="flex-shrink-0">
                  <img
                    src={previewImage}
                    alt="Profile preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                </div>
              )}
            </div>
          </Form.Group>

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-6 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default UserForm;