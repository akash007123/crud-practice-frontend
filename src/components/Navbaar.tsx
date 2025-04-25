import { useNavigate } from 'react-router-dom';

const Navbaar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="sticky top-0 bg-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-auto mb-2 lg:mb-0">
            <a href="/" className="text-xl font-semibold text-gray-800 hover:text-yellow-600 transition duration-200">
              Home
            </a>
          </div>
          
          <div className="flex gap-2 justify-end w-full lg:w-auto">
            {/* <button
              onClick={() => navigate('/userlist')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
            >
              User List
            </button> */}
            <button
              onClick={() => navigate('/users/new')}
              className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded transition duration-300"
            >
              Add User
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbaar;
