import MenuItem from "./MenuItem";
import { Home, FileText, Settings } from "lucide-react";

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { name: "Home", icon: Home },
    { name: "Logs", icon: FileText },
    { name: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-6 text-2xl font-bold text-purple-700">TraceLayer</div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <MenuItem
            key={item.name}
            label={item.name}
            Icon={item.icon}
            active={activePage === item.name}
            onClick={() => setActivePage(item.name)}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
