import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-700 leading-tight">
              Welcome to <span style={{color:'#3DC1C9'}}>Profile Viesta</span>
            </h1>
            <p className="text-lg text-gray-600">
              A comprehensive user management portal that helps you efficiently
              manage your user database. Explore user details, add new users,
              and streamline your user management process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={() => navigate("/userlist")}
                className=" text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition shadow-md" style={{backgroundColor:'#3DC1C9'}}
              >
                View User List
              </button>
              <button
                onClick={() => navigate("/users/new")}
                className="bg-gray-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800 transition shadow-md"
              >
                Add New User
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="User Management"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                User Management
              </h3>
              <p className="text-gray-600">
                Easily view, add, edit, and delete user profiles with our
                intuitive interface.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Advanced Search
              </h3>
              <p className="text-gray-600">
                Find users quickly with our powerful search and filter
                capabilities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Secure & Reliable
              </h3>
              <p className="text-gray-600">
                Your data is protected with our secure and reliable user
                management system.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://media-hosting.imagekit.io/177db6860c7e4711/Face.jpeg?Expires=1840192857&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=XbCc6-7ptstf1x7TH42jgv~nRwF9nx5xreuVrtY9s56Rna5lNfWjhaoC2zx8adonssOUxN-ShgCsKH66xplvwbegIFBUXTKgmYovwVSWPhQ7J159hfnI1Pcx7jWpEJjbqpv~ivLADsKC0fkc0KRt1NtQ7X-svI-Ep8GIilVDgaoCwCe96MQTuZEDfmgRYlqkNCTLB6YySjVK67A1zB7scySly4-d1owiuU5V7FZpy93tkVUWTNZKgalCmK~J8ltXH8zj6DWX5IN4Nf41JyWivcvxNI1czaocgzc3Dir1QqyNgOjZlyTcNCFwJhua7As6j4TzCliS4E8749tqRmZrPQ__"
                  alt="User"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">Karan Malhotra</h4>
                  <p className="text-gray-500 text-sm">HR Manager</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Profile Viesta has transformed how we manage our employee
                database. The interface is intuitive and the features are
                exactly what we needed."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://media-hosting.imagekit.io/47e85ed384364854/Face%20(1).jpeg?Expires=1840192886&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Ua7MbgGqO6s4QbtaFb-cdQx0LDRRprTdUK~sWev277oDS9jACQ50plcFXvlEO9wQJFhgy21hqXlU0nTjRXchVx1UT-2ffOqy~NjI-7o14vKFrwafoALIRjjJ3bhAaFucIx91FIOZuTO7khzcxRjQtrNfeppFrIM6lD1Pwn25tsVK1BIGwMkDLiqL9rlKeRRFHcy-x~phNnsNUSYUAAHCzo9xVgczS4zPjM5WQFGvB8urnnSKjKcFa18jc0zaugbkRwlZC4V-ZRlyCKPHe8-QmnwSM3mQ841ZeGuy9UoBy6qUY9uoEjXGYPWxe2Du2S8Dh2hAU0-3BTNUxofEOV0dhA__"
                  alt="User"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">Piyush rajoda</h4>
                  <p className="text-gray-500 text-sm">IT Director</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The search and filter capabilities are outstanding. We can now
                find any user information in seconds, saving us valuable time."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className=" py-16" style={{backgroundColor:'#3DC1C9'}}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of organizations that trust Profile Viesta for their
            user management needs.
          </p>
          <button
            onClick={() => navigate("/userlist")}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition shadow-md"
          >
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
