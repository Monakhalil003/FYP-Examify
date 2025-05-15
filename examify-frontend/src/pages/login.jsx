import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { loginUser } from '../services/api';

const GoogleIcon = () => (
  <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam) {
      setRole(roleParam);
    } else {
      navigate('/login-selection');
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      const response = await loginUser({ ...formData, userType: role });
  
      if (response?.user?.userType) {
        const userType = response.user.userType;
  
        if (userType === 'examiner') {
          navigate('/examiner-dashboard');
        } else if (userType === 'examinee') {
          navigate('/examinee-dashboard');
        } else if (userType === 'admin') {
          navigate('/admin-dashboard');
        }
      } else {
        setError('Unexpected response from server. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };
  

  const handleGoogleLogin = async () => {
    window.open(
      `${import.meta.env.VITE_API_URL}/auth/google`,
      "_self"
    );
  };

  const handleFacebookLogin = async () => {
    window.open(
      `${import.meta.env.VITE_API_URL}/auth/facebook`,
      "_self"
    );
  };

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
    <div className="min-h-screen flex items-start justify-center">
      <div className="background-wrapper" />
      <div className="bg-white bg-opacity-95 p-6 rounded-lg shadow-lg w-full max-w-sm z-10 border border-gray-200 mt-10">
        <h1 className="text-2xl font-semibold text-center mb-2">Welcome Back!</h1>
        <p className="text-center text-gray-600 mb-6 text-sm">Sign in as {role}</p>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-left ">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
          
          <label className="block text-sm font-medium mb-1 text-left">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
         <div className="flex justify-end items-center mt-1">
              <Link 
                to="/forgot-password"
                className="text-sm text-green-600 hover:text-green-700 mb-1 text-right"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={handleGoogleLogin}
              className="flex justify-center items-center px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:shadow-md transition duration-300"
            >
              <GoogleIcon />
              <span className="text-gray-600">Google</span>
            </button>
            <button
              onClick={handleFacebookLogin}
              className="flex justify-center items-center px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:shadow-md transition duration-300"
            >
              <FaFacebook className="mr-2 text-[#1877F2]" size={18} />
              <span className="text-gray-600">Facebook</span>
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-green-600 hover:text-green-700 font-medium">
            Register now
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Login;
