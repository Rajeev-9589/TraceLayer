// components/LogViewer.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const LogViewer = ({ appId }) => {
  const [activities, setActivities] = useState([]);
  const [suspiciousLogs, setSuspiciousLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const [activityRes, suspiciousRes] = await Promise.all([
          axios.get(`http://localhost:5500/logs/activities/${appId}`),
          axios.get(`http://localhost:5500/logs/datarateslimit/${appId}`),
        ]);

        setActivities(activityRes.data);
        setSuspiciousLogs(suspiciousRes.data);
      } catch (error) {
        console.error('Failed to fetch logs', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [appId]);

  if (loading) return <p>Loading logs...</p>;

  return (
    <div className="p-4 space-y-6">
      <section>
        <h2 className="text-xl font-semibold mb-2">Activity Logs</h2>
        <div className="bg-white shadow p-4 rounded-md max-h-60 overflow-y-auto">
          {activities.map((log, idx) => (
            <div key={idx} className="border-b py-1 text-sm">
              [{new Date(log.createdAt).toLocaleString()}] - {log.action || log.path}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Suspicious Requests</h2>
        <div className="bg-white shadow p-4 rounded-md max-h-60 overflow-y-auto">
          {suspiciousLogs.map((log, idx) => (
            <div key={idx} className="border-b py-1 text-sm">
              [{new Date(log.timestamp).toLocaleString()}] - {log.ip} - {log.reason}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LogViewer;
