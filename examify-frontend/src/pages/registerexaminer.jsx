import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonUserFields from '../components/commonuserfield';
import { registerUser } from '../services/api';

function RegisterExaminer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    userType: 'examiner',
    examinerType: '',
    // Academic fields
    qualifications: '',
    teachingExperience: '',
    institutionName: '',
    specialization: '',
    // Professional fields
    companyName: '',
    jobTitle: '',
    industrySector: '',
    professionalCertifications: ''
  });

  const [validationMessage, setValidationMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationMessage('');
    setLoading(true);

    const { name, email, password, contact, examinerType } = formData;

    if (!name || !email || !password || !contact || !examinerType) {
      setValidationMessage('Please fill all required fields.');
      setLoading(false);
      return;
    }

    if (examinerType === 'academic' && (!formData.qualifications || !formData.teachingExperience || !formData.institutionName || !formData.specialization)) {
      setValidationMessage('Please complete all academic-specific fields.');
      setLoading(false);
      return;
    }

    if (examinerType === 'professional' && (!formData.companyName || !formData.jobTitle || !formData.industrySector)) {
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
        <p className="text-center text-gray-600 mb-6 text-sm">Hello Examiner, please fill the fields below</p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-sm font-medium mb-1">Examiner Type</label>
            <select
              value={formData.examinerType}
              onChange={(e) => setFormData({ ...formData, examinerType: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              required
            >
              <option value="">Select type</option>
              <option value="academic">Academic</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          {formData.examinerType === 'academic' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Professional Qualifications</label>
                <input
                  type="text"
                  value={formData.qualifications}
                  onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="e.g., PhD in Computer Science"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Teaching Experience</label>
                <input
                  type="text"
                  value={formData.teachingExperience}
                  onChange={(e) => setFormData({ ...formData, teachingExperience: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="e.g., 5 years"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Institution Name</label>
                <input
                  type="text"
                  value={formData.institutionName}
                  onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Subject Specialization</label>
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="e.g., Database Systems"
                />
              </div>
            </div>
          )}

          {formData.examinerType === 'professional' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Job Title</label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Industry Sector</label>
                <input
                  type="text"
                  value={formData.industrySector}
                  onChange={(e) => setFormData({ ...formData, industrySector: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Professional Certifications</label>
                <input
                  type="text"
                  value={formData.professionalCertifications}
                  onChange={(e) => setFormData({ ...formData, professionalCertifications: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="e.g., AWS Certified, PMP"
                />
              </div>
            </div>
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

export default RegisterExaminer;
