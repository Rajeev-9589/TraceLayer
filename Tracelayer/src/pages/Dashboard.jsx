// // import { useEffect, useRef, useState } from "react";
// // import gsap from "gsap";
// // import Sidebar from "../components/Sidebar";
// // import Navbar from "../components/Navbar";

// // import HomePage from "../pages/HomePage";
// // import LogsPage from "../pages/LogsPage";
// // import SettingsPage from "../pages/SettingsPage";


// // const Dashboard = () => {
// //   const contentRef = useRef(null);
// //   const [activePage, setActivePage] = useState("Home");

// // //   useEffect(() => {
// // //     gsap.fromTo(
// // //   contentRef.current,
// // //   { opacity: 0, y: 20 },
// // //   { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
// // // );
// // //   }, [activePage]);



// //   return (
// //     <div className="flex h-screen bg-gray-50 text-gray-800">
// //       <Sidebar activePage={activePage} setActivePage={setActivePage} />
// //       <div className="flex-1 flex flex-col">
// //         <Navbar activePage={activePage} />

// //         <main ref={contentRef} className="p-8 text-xl font-medium">
// // {activePage === "Home" && <HomePage />}
// // {activePage === "Logs" && <LogsPage />}
// // {activePage === "Settings" && <SettingsPage />}

// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;


// import { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import HomePage from "../pages/HomePage";
// import LogsPage from "../pages/LogsPage";
// import SettingsPage from "../pages/SettingsPage";

// const Dashboard = () => {
//   const [activePage, setActivePage] = useState("Home");

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar activePage={activePage} setActivePage={setActivePage} />
//       <div className="flex flex-col flex-1">
//         <Navbar activePage={activePage} />
//         <main className="p-8 text-xl">
//           {activePage === "Home" && <HomePage />}
//           {activePage === "Logs" && <LogsPage />}
//           {activePage === "Settings" && <SettingsPage />}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// import { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";

// const Dashboard = () => {
//   const [activePage, setActivePage] = useState("Home");

//   return (
//     <div className="h-screen flex flex-col">
//       {/* Navbar */}
//       <Navbar activePage={activePage} />

//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <Sidebar activePage={activePage} setActivePage={setActivePage} />

//         {/* Main content */}
//         <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
//           {activePage === "Home" && <h2 className="text-2xl">Welcome to Home Page</h2>}
//           {activePage === "Logs" && <h2 className="text-2xl">Here are your Logs</h2>}
//           {activePage === "Settings" && <h2 className="text-2xl">Adjust your Settings</h2>}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

// Import your real page components
import HomePage from "../pages/HomePage";
import LogsPage from "../pages/LogsPage";
import SettingsPage from "../pages/SettingsPage";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("Home");

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar activePage={activePage} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        {/* Main content */}
        <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
          {activePage === "Home" && <HomePage />}
          {activePage === "Logs" && <LogsPage />}
          {activePage === "Settings" && <SettingsPage />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

