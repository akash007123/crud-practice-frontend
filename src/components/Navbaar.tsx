import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbaar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <a 
              href="/" 
              className="flex items-center space-x-2"
              style={{textDecoration:'none'}}
            >
              <img src="https://media-hosting.imagekit.io/5fa716e3018c4f2f/logo.png?Expires=1840192924&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=0tmJm3gCadSDgM2V4fqWutWmrU6NYkW0ImYx4KTFho9qHksry78khTq1m7yy7Dr-GE~Wsjuot8JC1dOStoY1rkN5d87ouIEah7~KeAAMWYpqGqdWUWrIyKgz56-wh~CVnVargTYAsqsD89WtDi3cVbbVhg-orGZWOIf91g7R--rmgL7SFvM7b15VPGLWQ32xgYT4wmWcdAzlxKjh3ATuiAtZ0M-DuMWH0GPjk8hM4Egri50VX-PVfVWCsBqsHtSSAjVK1HwYhk4h6FfXztBPtuPUgocYQwVX7QUHC~fuk7gPrdoSW3FlERQMbfc2-yAcDzXcs83cvA2TAXXhGCrdVg__" alt="Profile Viesta Logo" className="h-auto w-48" />
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 gap-2" >
            <button
              onClick={() => navigate('/userlist')}
              className="text-white hover:bg-blue-700 px-4 button-style py-2 rounded-md text-sm font-medium transition duration-200" 
              style={{backgroundColor:'#3DC1C9'}}
            >
              View Users
            </button>
            <button
              onClick={() => navigate('/users/new')}
              className="bg-gray-700 text-white button-style hover:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              Add New User
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200">
            <div className="flex justify-around items-center h-16 px-4">
              <button
                onClick={() => {
                  navigate('/userlist');
                  setIsMenuOpen(false);
                }}
                className="flex flex-col items-center justify-center w-1/2 h-full text-gray-600 hover:text-blue-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="text-xs mt-1">Users</span>
              </button>
              <button
                onClick={() => {
                  navigate('/users/new');
                  setIsMenuOpen(false);
                }}
                className="flex flex-col items-center justify-center w-1/2 h-full text-gray-600 hover:text-blue-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-xs mt-1">Add User</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbaar;