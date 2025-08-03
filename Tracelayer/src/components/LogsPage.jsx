import { useEffect, useRef } from "react";
import gsap from "gsap";

const LogsPage = () => {
  const logsRef = useRef(null);

  useEffect(() => {
    gsap.from(logsRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  return (
    <div ref={logsRef} className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Recent Logs</h2>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <p className="text-gray-700">🕒 2025-08-02 10:12 AM — System rebooted</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <p className="text-gray-700">✅ 2025-08-01 07:45 PM — User settings updated</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <p className="text-gray-700">🚨 2025-07-31 09:00 PM — Unauthorized login attempt</p>
      </div>
    </div>
  );
};

export default LogsPage;
