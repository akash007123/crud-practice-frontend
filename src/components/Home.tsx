import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-3xl text-center space-y-6 py-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
          Welcome to the User Management Portal
        </h1>
        <p className="text-lg text-gray-600">
          This portal allows you to view a comprehensive list of users and manage them efficiently. 
          You can explore user details or add new users to the system with ease.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={() => navigate('/userlist')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            View User List
          </button>
          <button
            onClick={() => navigate('/users/new')}
            className="bg-gray-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition"
          >
            Add New User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
