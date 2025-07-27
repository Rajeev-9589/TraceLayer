import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const appId = localStorage.getItem('appId');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get(`/activities/${appId}`);
        setLogs(res.data);
      } catch (err) {
        console.error('Error fetching logs', err);
      }
    };

    fetchLogs();
  }, [appId]);

  return (
    <div>
      <h2>Activity Logs</h2>
      <ul>
        {logs.map((log, i) => (
          <li key={i}>{log.path} - {log.method} - {log.timestamp}</li>
        ))}
      </ul>
    </div>
  );
}
