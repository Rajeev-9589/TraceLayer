// import React, { useEffect, useState } from 'react';
// import api from '../services/api';

// export default function Logs() {
//   const [logs, setLogs] = useState([]);
//   const appId = localStorage.getItem('appId');

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const res = await api.get(`/activities/${appId}`);
//         setLogs(res.data);
//       } catch (err) {
//         console.error('Error fetching logs', err);
//       }
//     };

//     fetchLogs();
//   }, [appId]);

//   return (
//     <div>
//       <h2>Activity Logs</h2>
//       <ul>
//         {logs.map((log, i) => (
//           <li key={i}>{log.path} - {log.method} - {log.timestamp}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';

// Dummy data to simulate logs
const generateDummyLogs = () => {
  const actions = ['Commit', 'Pull Request', 'Issue'];
  const methods = ['CREATE', 'UPDATE', 'DELETE'];
  const paths = [
    '/src/components/Button.js',
    '/README.md',
    '/src/styles/main.css',
    '/src/utils/helpers.js',
    '/src/pages/Home.js',
  ];
  const authors = ['alice', 'bob', 'carol', 'dave', 'eve'];
  
  const logs = [];
  for (let i = 0; i < 50; i++) {
    const timestamp = new Date(Date.now() - Math.random() * 10000000000).toISOString(); // Random timestamps
    const action = actions[Math.floor(Math.random() * actions.length)];
    const method = methods[Math.floor(Math.random() * methods.length)];
    const path = paths[Math.floor(Math.random() * paths.length)];
    const author = authors[Math.floor(Math.random() * authors.length)];
    const message = `This is a ${action} action by ${author} on ${path}`;
    
    logs.push({
      id: i,
      timestamp,
      action,
      method,
      path,
      author,
      message,
    });
  }

  return logs;
};

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const appId = localStorage.getItem('appId');

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulating a network request by generating dummy data
        const dummyData = generateDummyLogs();
        setLogs(dummyData);
      } catch (err) {
        setError('Failed to fetch logs. Please try again later.');
        console.error('Error fetching logs', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [appId]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6">Activity Logs</h2>

      {loading && <p>Loading logs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white p-6 rounded shadow-md">
        {logs.length === 0 ? (
          <p>No logs available at the moment.</p>
        ) : (
          <ul className="space-y-4">
            {logs.map((log) => (
              <li key={log.id} className="border-b pb-4">
                <div className="font-semibold text-lg">{log.action} by {log.author}</div>
                <div className="text-sm text-gray-600">{log.timestamp}</div>
                <div className="text-gray-700">{log.message}</div>
                <div className="italic text-sm text-gray-500">Method: {log.method}</div>
                <div className="text-sm text-gray-500">Path: {log.path}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
