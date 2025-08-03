import { useState, useEffect } from "react";

const SettingsPage = () => {
  // Theme and user settings state
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [username, setUsername] = useState("JohnDoe123");
  const [email, setEmail] = useState("johndoe@example.com");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleSaveSettings = () => {
    alert("Settings saved successfully!");
    // Implement API call or save to localStorage here
  };

  return (
    <div className="space-y-8 p-8 max-w-4xl mx-auto">
      {/* Title */}
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">User Settings</h2>

      {/* Theme Settings (Dark/Light Mode) */}
      <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Appearance</h3>
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="toggle toggle-accent"
          />
          <span className="text-lg text-gray-700 dark:text-gray-300">Enable Dark Mode</span>
        </div>
      </div>

      {/* User Profile Settings */}
      <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Profile Information</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="text-lg text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mt-2 border rounded-lg shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-lg text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border rounded-lg shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Notification Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
              className="toggle toggle-accent"
            />
            <span className="text-lg text-gray-700 dark:text-gray-300">Email Notifications</span>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={pushNotifications}
              onChange={() => setPushNotifications(!pushNotifications)}
              className="toggle toggle-accent"
            />
            <span className="text-lg text-gray-700 dark:text-gray-300">Push Notifications</span>
          </div>
        </div>
      </div>

      {/* Save Settings Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSaveSettings}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
