import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-start relative">
      <div 
        className="fixed inset-0 bg-no-repeat bg-cover bg-center -z-10" 
        style={{ 
          backgroundImage: "url('/register.png')",
          backgroundSize: 'cover'
        }}
      />
      
      <div className="container relative z-10 pt-35">
        <div className="ml-12 max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Register</h1>
          <p className="text-lg text-gray-600 mb-8">Please select your role</p>
          
          <div className="space-y-3">
            <Link 
              to="/registerexaminer" 
              className="block w-full bg-green-500 text-white py-2.5 px-4 rounded-md text-base font-medium hover:bg-green-600 transition duration-300 text-center"
            >
              Register as Examiner
            </Link>
            <Link 
              to="/registerexaminee" 
              className="block w-full bg-blue-500 text-white py-2.5 px-4 rounded-md text-base font-medium hover:bg-blue-600 transition duration-300 text-center"
            >
              Register as Examinee
            </Link>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
