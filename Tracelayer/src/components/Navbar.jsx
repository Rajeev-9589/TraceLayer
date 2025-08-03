import { useNavigate } from "react-router-dom";

const Navbar = ({ activePage }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <header className="h-16 bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 flex justify-between items-center px-8 shadow text-white">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-extrabold tracking-wide drop-shadow-lg">
          TraceLayer
        </span>
        <span className="ml-6 text-lg font-medium opacity-80">
          {activePage}
        </span>
      </div>
      <button
        onClick={handleLogout}
        className="px-5 py-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 text-white font-semibold transition-all shadow"
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;
