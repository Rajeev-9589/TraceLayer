import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SuspiciousIPs = () => {
  const [ips, setIps] = useState([]);

  useEffect(() => {
    const fetchIPs = async () => {
      const res = await axios.get('http://localhost:5000/api/suspicious-ips');
      setIps(res.data);
    };
    fetchIPs();
  }, []);

  return (
    <div className="border p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-3">⚠️ Suspicious IPs</h2>
      {ips.length === 0 ? <p>No flagged IPs.</p> : (
        <ul className="list-disc ml-6">
          {ips.map((ip, idx) => (
            <li key={idx}>{ip}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuspiciousIPs;
