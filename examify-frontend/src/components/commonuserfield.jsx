import React from 'react';

function CommonUserFields({ formData, setFormData }) {
  return (
    <>
      <label className="block text-sm font-medium mb-2"><strong>Full Name</strong></label>
      <input
        type="text"
        placeholder="Enter your name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />

      <label className="block text-sm font-medium mb-2"><strong>Email</strong></label>
      <input
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />

      <label className="block text-sm font-medium mb-2"><strong>Password</strong></label>
      <input
        type="password"
        placeholder="Enter password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
   
      <label className="block text-sm font-medium mb-2"><strong>Contact Number</strong></label>
      <input
        type="tel"
        placeholder="e.g. +92 300 1234567"
        value={formData.contact}
        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
    </>
  );
}

export default CommonUserFields;