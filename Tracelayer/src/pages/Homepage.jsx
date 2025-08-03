import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const HomePage = () => {
  const homeRef = useRef(null);

  // Dummy data for the home page
  const [activities, setActivities] = useState([
    { action: "Updated", repo: "Project A", time: "2 mins ago" },
    { action: "Created a pull request", repo: "Project B", time: "10 mins ago" },
    { action: "Pushed to master branch", repo: "Project C", time: "30 mins ago" },
    { action: "Opened an issue", repo: "Project D", time: "1 hour ago" },
    { action: "Merged pull request", repo: "Project E", time: "2 hours ago" },
  ]);

  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 5120,
    activeUsers: 1234,
    commitsToday: 342,
    openIssues: 42,
  });

  useEffect(() => {
    gsap.fromTo(
      homeRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div ref={homeRef} className="space-y-8">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4">Welcome to TraceLayer Dashboard ✨</h1>
      <p className="text-lg text-gray-700">
        Select an option from the sidebar to get started or explore the latest activities below.
      </p>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">{dashboardStats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold">Active Users</h3>
          <p className="text-3xl font-bold text-green-600">{dashboardStats.activeUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold">Commits Today</h3>
          <p className="text-3xl font-bold text-yellow-600">{dashboardStats.commitsToday}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold">Open Issues</h3>
          <p className="text-3xl font-bold text-red-600">{dashboardStats.openIssues}</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={index} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.repo}</p>
              </div>
              <span className="text-sm text-gray-400">{activity.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Upcoming Events (Dummy Data) */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        <ul className="space-y-4">
          <li className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <p className="font-medium">Team Sync-up</p>
              <p className="text-sm text-gray-500">Discuss project roadmap</p>
            </div>
            <span className="text-sm text-gray-400">Tomorrow, 10:00 AM</span>
          </li>
          <li className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <p className="font-medium">Code Review Session</p>
              <p className="text-sm text-gray-500">Review pull requests</p>
            </div>
            <span className="text-sm text-gray-400">Next Week, 2:00 PM</span>
          </li>
          <li className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <p className="font-medium">Feature Demo</p>
              <p className="text-sm text-gray-500">Present new features</p>
            </div>
            <span className="text-sm text-gray-400">In 2 Weeks, 11:00 AM</span>
          </li>
        </ul>
      </div>

      {/* User Profile (Dummy Info) */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">User Profile</h3>
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
            A
          </div>
          <div>
            <p className="text-lg font-semibold">Alex Johnson</p>
            <p className="text-sm text-gray-500">alex@domain.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
