import React from 'react';
import { Link } from 'react-router-dom';

const LoginSelection = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/register.png')",
          zIndex: -1
        }}
      />
      
      {/* Content */}
      <div className="relative container z-10  pt-30">
        <div className="ml-25 max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Examify</h1>
          <p className="text-lg text-gray-600 mb-8">Please select your role to login</p>
          
          <div className="space-y-3">
            <Link 
              to="/login?role=examiner" 
              className="block w-full bg-white text-black py-3 px-4 rounded-md text-base font-medium hover:bg-green-500 transition duration-300 text-center shadow-md hover:shadow-lg border border-black"
            >
              Login as Examiner
            </Link>
            <Link 
              to="/login?role=examinee" 
              className="block w-full bg-white text-black py-3 px-4 rounded-md text-base font-medium hover:bg-green-500 transition duration-300 text-center shadow-md hover:shadow-lg border border-black"
            >
              Login as Examinee
            </Link>
            <Link 
              to="/login?role=admin" 
              className="block w-full bg-white text-black py-3 px-4 rounded-md text-base font-medium hover:bg-green-500 transition duration-300 text-center shadow-md hover:shadow-lg border border-black"
            >
              Login as Admin
            </Link>
          </div>

          <div className="mt-6 text-sm text-gray-600 text-center">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSelection; 