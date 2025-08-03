import { LogOut, Home, FileText, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-8 text-blue-600">TraceLayer</h1>
        <nav className="space-y-4">
          <MenuItem icon={<Home size={20} />} label="Home" />
          <MenuItem icon={<FileText size={20} />} label="Logs" />
          <MenuItem icon={<Settings size={20} />} label="Settings" />
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white flex justify-between items-center px-6 shadow-sm">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition">
            <LogOut size={16} />
            Logout
          </button>
        </header>

        <main className="p-8 text-xl font-medium">{children}</main>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition cursor-pointer">
    {icon}
    <span>{label}</span>
  </div>
);

export default Layout;
