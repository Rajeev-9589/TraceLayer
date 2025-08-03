const LogsPage = () => {
  const logs = [
    { id: 1, message: "User logged in", time: "10:24 AM", status: "info" },
    { id: 2, message: "Error connecting to DB", time: "10:27 AM", status: "error" },
    { id: 3, message: "Payment successful", time: "10:35 AM", status: "success" },
    { id: 4, message: "User signed out", time: "10:55 AM", status: "info" },
  ];

  const statusColors = {
    info: "text-blue-500",
    error: "text-red-500",
    success: "text-green-500",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Recent Logs</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-600">
            <th className="pb-2">#</th>
            <th className="pb-2">Message</th>
            <th className="pb-2">Time</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-t">
              <td className="py-2">{log.id}</td>
              <td className="py-2">{log.message}</td>
              <td className="py-2">{log.time}</td>
              <td className={`py-2 font-medium ${statusColors[log.status]}`}>
                {log.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogsPage;
