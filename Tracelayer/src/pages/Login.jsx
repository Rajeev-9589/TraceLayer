import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Login handler
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username] && users[username].password === password) {
      localStorage.setItem("isAuthenticated", "true"); // Set the flag here
      setError(""); // Clear error
      navigate("/dashboard"); // Navigate to dashboard on successful login
    } else {
      setError("Invalid username or password");
    }
  };

  // Register handler
  const handleRegister = () => {
    if (!regUsername || !regEmail || !regPassword) {
      setError("All fields are required");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[regUsername]) {
      setError("Username already exists!");
      return;
    }
    users[regUsername] = { password: regPassword, email: regEmail };
    localStorage.setItem("users", JSON.stringify(users));
    setError("");
    setShowRegister(false);
    setUsername(regUsername);
    setPassword(regPassword);
    setRegUsername("");
    setRegEmail("");
    setRegPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        {/* Logo and Trademark */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">TraceLayer</h1>
          <span className="text-sm text-gray-500">® All Rights Reserved</span>
        </div>

        {/* Login/Register Form */}
        {!showRegister ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded"
                autoComplete="username"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded"
                autoComplete="current-password"
              />
              {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded mb-2"
              >
                Login
              </button>
            </form>
            <div className="text-center mt-4">
              <span>Don't have an account?</span>
              <button
                className="ml-2 text-blue-600 hover:underline"
                onClick={() => {
                  setShowRegister(true);
                  setError("");
                }}
              >
                Register
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              <input
                type="text"
                placeholder="Username"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded"
                autoComplete="username"
              />
              <input
                type="email"
                placeholder="Email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded"
                autoComplete="email"
              />
              <input
                type="password"
                placeholder="Password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full mb-3 px-3 py-2 border rounded"
                autoComplete="new-password"
              />
              {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded mb-2"
              >
                Register
              </button>
            </form>
            <div className="text-center mt-4">
              <span>Already have an account?</span>
              <button
                className="ml-2 text-green-600 hover:underline"
                onClick={() => {
                  setShowRegister(false);
                  setError("");
                }}
              >
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
