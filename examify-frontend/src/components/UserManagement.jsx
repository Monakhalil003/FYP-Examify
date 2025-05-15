import React, { useState, useEffect } from 'react';
import { getAllUsers, updateUserRole, toggleUserStatus, getUserDetails } from '../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      await fetchUsers(); // Refresh the list
      setError('');
    } catch (err) {
      setError('Failed to update user role');
      console.error('Error updating role:', err);
    }
  };

  const handleStatusToggle = async (userId) => {
    try {
      await toggleUserStatus(userId);
      await fetchUsers(); // Refresh the list
      setError('');
    } catch (err) {
      setError('Failed to toggle user status');
      console.error('Error toggling status:', err);
    }
  };

  const handleViewDetails = async (userId) => {
    try {
      const details = await getUserDetails(userId);
      setSelectedUser(details);
      setShowUserModal(true);
      setError('');
    } catch (err) {
      setError('Failed to fetch user details');
      console.error('Error fetching user details:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button
          onClick={fetchUsers}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Refresh List
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  <select
                    value={user.userType}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border rounded px-2 py-1"
                    disabled={user.userType === 'admin'} // Prevent changing admin roles
                  >
                    <option value="examiner">Examiner</option>
                    <option value="examinee">Examinee</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.isVerified
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.isVerified ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => handleViewDetails(user._id)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    View
                  </button>
                  {user.userType !== 'admin' && (
                    <button
                      onClick={() => handleStatusToggle(user._id)}
                      className={`${
                        user.isVerified
                          ? 'text-red-600 hover:text-red-800'
                          : 'text-green-600 hover:text-green-800'
                      }`}
                    >
                      {user.isVerified ? 'Deactivate' : 'Activate'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">User Details</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Name:</p>
                <p>{selectedUser.name}</p>
              </div>
              <div>
                <p className="font-semibold">Email:</p>
                <p>{selectedUser.email}</p>
              </div>
              <div>
                <p className="font-semibold">Contact:</p>
                <p>{selectedUser.contact}</p>
              </div>
              <div>
                <p className="font-semibold">Role:</p>
                <p className="capitalize">{selectedUser.userType}</p>
              </div>
              {selectedUser.userType === 'examiner' && (
                <>
                  <div>
                    <p className="font-semibold">Examiner Type:</p>
                    <p>{selectedUser.examinerType}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Credentials:</p>
                    <p>{selectedUser.credentials}</p>
                  </div>
                </>
              )}
              {selectedUser.userType === 'examinee' && (
                <>
                  <div>
                    <p className="font-semibold">Education Level:</p>
                    <p>{selectedUser.educationLevel}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Institute:</p>
                    <p>{selectedUser.instituteName}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Major:</p>
                    <p>{selectedUser.major}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Year/Semester:</p>
                    <p>{selectedUser.yearSemester}</p>
                  </div>
                </>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement; 