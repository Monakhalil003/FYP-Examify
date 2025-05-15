import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UserManagement from '../components/UserManagement';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [profileData, setProfileData] = useState({
    name: 'Mona Khalil',
    email: 'monakhalil@examify.com',
    contact: '+92 300 1234567',
    role: 'admin'
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profileData);
  const [dashboardStats, setDashboardStats] = useState({
    exams: 203,
    students: 351,
    questions: 500,
    announcements: 15
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setProfileData(editedProfile);
    setIsEditingProfile(false);
    // Here you would typically make an API call to update the profile
  };

  const handleSignOut = () => {
    navigate('/login-selection');
  };

  const handleProfileClick = () => {
    if (showProfileDropdown) {
      setShowProfileDropdown(false);
    } else {
      setShowProfileDropdown(true);
    }
  };

  const handleViewProfile = () => {
    setActiveTab('profile');
    setShowProfileDropdown(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-green-500 text-white p-4">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold">Admin</h1>
        </div>
        
        <nav>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left p-3 rounded mb-2 flex items-center ${activeTab === 'dashboard' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <i className="fas fa-home mr-2"></i> Dashboard
          </button>
          
          <button 
            onClick={() => setActiveTab('exams')}
            className={`w-full text-left p-3 rounded mb-2 flex items-center ${activeTab === 'exams' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <i className="fas fa-file-alt mr-2"></i> Exams
          </button>
          
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full text-left p-3 rounded mb-2 flex items-center ${activeTab === 'users' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <i className="fas fa-users mr-2"></i> Users
          </button>
          
          <button 
            onClick={() => setActiveTab('questions')}
            className={`w-full text-left p-3 rounded mb-2 flex items-center ${activeTab === 'questions' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <i className="fas fa-question-circle mr-2"></i> Questions
          </button>
          
          <button 
            onClick={() => setActiveTab('reports')}
            className={`w-full text-left p-3 rounded mb-2 flex items-center ${activeTab === 'reports' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <i className="fas fa-chart-bar mr-2"></i> Reports
          </button>
          
          <button 
            onClick={() => setActiveTab('announcements')}
            className={`w-full text-left p-3 rounded mb-2 flex items-center ${activeTab === 'announcements' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <i className="fas fa-bullhorn mr-2"></i> Announcements
          </button>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left p-3 rounded mb-2 flex items-center ${activeTab === 'profile' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <i className="fas fa-user mr-2"></i> Profile
          </button>
          
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left p-3 rounded mb-2 flex items-center ${activeTab === 'settings' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <i className="fas fa-cog mr-2"></i> Settings
          </button>
          
          <button 
            onClick={handleSignOut}
            className="w-full text-left p-3 rounded mb-2 flex items-center hover:bg-green-600"
          >
            <i className="fas fa-sign-out-alt mr-2"></i> Sign Out
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <div className="flex items-center">
            <button className="mr-4">
              <i className="fas fa-bell text-gray-600"></i>
            </button>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleProfileClick}
                className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition-colors duration-200"
              >
                {profileData.name.charAt(0)}
              </button>
              
              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                    <div className="font-medium">{profileData.name}</div>
                    <div className="text-gray-500 text-xs truncate">{profileData.email}</div>
                  </div>
                  <button
                    onClick={handleViewProfile}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <i className="fas fa-user mr-2"></i> View Profile
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('settings');
                      setShowProfileDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <i className="fas fa-cog mr-2"></i> Settings
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center border-t border-gray-200"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Total Exams</h3>
                <i className="fas fa-file-alt text-green-500 text-2xl"></i>
              </div>
              <p className="text-3xl font-bold">{dashboardStats.exams}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Total Students</h3>
                <i className="fas fa-users text-blue-500 text-2xl"></i>
              </div>
              <p className="text-3xl font-bold">{dashboardStats.students}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Questions</h3>
                <i className="fas fa-question-circle text-purple-500 text-2xl"></i>
              </div>
              <p className="text-3xl font-bold">{dashboardStats.questions}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Announcements</h3>
                <i className="fas fa-bullhorn text-yellow-500 text-2xl"></i>
              </div>
              <p className="text-3xl font-bold">{dashboardStats.announcements}</p>
            </div>
          </div>
        )}

        {/* User Management */}
        {activeTab === 'users' && <UserManagement />}

        {/* Profile Content */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-6">Profile Information</h3>
            
            {isEditingProfile ? (
              <form onSubmit={handleProfileUpdate}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Contact Number</label>
                  <input
                    type="tel"
                    value={editedProfile.contact}
                    onChange={(e) => setEditedProfile({...editedProfile, contact: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setEditedProfile(profileData);
                      setIsEditingProfile(false);
                    }}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <p className="p-2 bg-green-100 rounded-md border border-black">{profileData.name}</p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <p className="p-2 bg-green-100 rounded-md border border-black">{profileData.email}</p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Contact Number</label>
                  <p className="p-2 bg-green-100 rounded-md border border-black">{profileData.contact}</p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <p className="p-2 bg-green-100 rounded-md border border-black capitalize">{profileData.role}</p>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Other tabs will show "Coming Soon" for now */}
        {['exams', 'users', 'questions', 'reports', 'announcements', 'settings'].includes(activeTab) && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-center text-gray-600">This feature is coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 