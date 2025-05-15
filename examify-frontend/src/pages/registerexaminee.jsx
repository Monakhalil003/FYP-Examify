import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonUserFields from '../components/commonuserfield';
import { registerUser } from '../services/api';

function RegisterExaminee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    dob: '',
    userType: 'examinee',
    examineeType: '',
    educationLevel: '',
    instituteName: '',
    rollNumber: '',
    major: '',
    yearSemester: '',
    qualification: '',
    experience: '',
    company: '',
    industry: '',
    skills: '',
  });

  const [validationMessage, setValidationMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationMessage('');
    setLoading(true);

    const { name, email, password, contact, examineeType } = formData;

    if (!name || !email || !password || !contact || !examineeType) {
      setValidationMessage('Please fill all required fields.');
      setLoading(false);
      return;
    }

    if (examineeType === 'student' && (!formData.educationLevel || !formData.instituteName || !formData.rollNumber || !formData.major || !formData.yearSemester)) {
      setValidationMessage('Please complete all student-specific fields.');
      setLoading(false);
      return;
    }

    if (examineeType === 'professional' && (!formData.qualification || !formData.experience || !formData.company || !formData.industry || !formData.skills)) {
      setValidationMessage('Please complete all professional-specific fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser(formData);
      setValidationMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setValidationMessage(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-no-repeat bg-cover bg-center -z-10" 
        style={{ backgroundImage: "url('/register.png')" }}
      />
      <div className="bg-white bg-opacity-95 p-6 rounded-lg shadow-lg w-full max-w-md z-10 border border-gray-200 my-8">
        <h1 className="text-2xl font-semibold text-center mb-2">Let's Register Account</h1>
        <p className="text-center text-gray-600 mb-6 text-sm">Hello Examinee, please fill the fields below</p>

        <form onSubmit={handleSubmit}>
          {validationMessage && (
            <div className={`text-center mb-4 p-3 rounded ${
              validationMessage.includes('successful') 
                ? 'bg-green-100 text-green-700 border border-green-400' 
                : 'bg-red-100 text-red-700 border border-red-400'
            }`}>
              {validationMessage}
            </div>
          )}

          <CommonUserFields formData={formData} setFormData={setFormData} />

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Examinee Type</label>
            <select
              value={formData.examineeType}
              onChange={(e) => setFormData({ ...formData, examineeType: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Select type</option>
              <option value="student">Student</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          {formData.examineeType === 'student' && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Education Level</label>
                <input
                  type="text"
                  value={formData.educationLevel}
                  onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="e.g., Bachelor's, Master's"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Institute Name</label>
                <input
                  type="text"
                  value={formData.instituteName}
                  onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Roll Number</label>
                <input
                  type="text"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Major</label>
                <input
                  type="text"
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Year/Semester</label>
                <input
                  type="text"
                  value={formData.yearSemester}
                  onChange={(e) => setFormData({ ...formData, yearSemester: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="e.g., 3rd Year, 6th Semester"
                />
              </div>
            </>
          )}

          {formData.examineeType === 'professional' && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Qualification</label>
                <input
                  type="text"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Experience</label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="e.g., 5 years"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Industry</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Skills</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="e.g., JavaScript, Python (comma-separated)"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterExaminee;