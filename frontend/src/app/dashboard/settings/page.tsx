'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function SettingsPage() {
  const user = useAuthStore((state) => state.user);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send update request to backend
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {saved && <div className="bg-green-100 text-green-700 p-4 rounded mb-4">Settings saved successfully!</div>}

      <div className="bg-white p-6 rounded-lg shadow max-w-2xl">
        <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
