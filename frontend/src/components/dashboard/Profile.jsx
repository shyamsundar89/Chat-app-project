import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useGlobalContext } from "../../context/globalContext";

const Profile = () => {
  const { user, updateProfile } = useGlobalContext();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    timezone: "Asia/Kolkata",
    theme: "dark",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.username || "",
        email: user.email || "",
        timezone: user.timezone || "Asia/Kolkata",
        theme: user.theme || "dark",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    const success = await updateProfile({
      username: formData.name,
      email: formData.email,
      timezone: formData.timezone,
      theme: formData.theme,
    });
    if (success) setEditMode(false);
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Profile</h2>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="text-sm flex items-center gap-2 px-4 py-2 bg-purple text-white rounded hover:bg-purple"
            >
              <MdEdit />
              Edit Profile
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <FaUserCircle className="text-6xl text-gray-400 dark:text-gray-600" />
          <div>
            <p className="text-lg font-medium">{formData.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{formData.email}</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              disabled={!editMode}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              disabled={!editMode}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Timezone</label>
            <select
              name="timezone"
              value={formData.timezone}
              disabled={!editMode}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Theme</label>
            <select
              name="theme"
              value={formData.theme}
              disabled={!editMode}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>

          {/* Save / Cancel */}
          {editMode && (
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-purple text-white rounded hover:bg-purple"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
