import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { requestPasswordReset, resetPassword } from '../services/api';

function ForgotPassword() {
  const [stage, setStage] = useState('request'); // 'request', 'verify', 'reset'
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await requestPasswordReset(email);
      setSuccess(response.message || 'Password reset link has been sent to your email.');
      setStage('verify');
    } catch (err) {
      setError(err.message || 'Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError('Password must be at least 8 characters long and contain letters, numbers, and symbols.');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      // Get token from URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      
      if (!token) {
        throw new Error('Reset token not found');
      }

      const response = await resetPassword(token, newPassword);
      setSuccess(response.message || 'Password has been reset successfully.');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0" 
        style={{ backgroundImage: "url('/register.png')" }}
      />
      <div className="bg-white bg-opacity-95 p-6 rounded-lg shadow-lg w-full max-w-sm z-10 border border-gray-200 h-100">
        <h1 className="text-2xl font-semibold text-center mb-6">Reset Password</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        {stage === 'request' && (
          <form onSubmit={handleRequestReset} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-left">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
                placeholder="Enter your registered email"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        {stage === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
                placeholder="Enter new password"
              />
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters long and contain letters, numbers, and symbols.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
                placeholder="Confirm new password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link to="/login" className="text-green-600 hover:text-green-700 text-sm">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword; 