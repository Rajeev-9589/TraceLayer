import React, { useEffect, useState } from 'react';
import {
  fetchActivityLogs,
  fetchBlockedIPs,
  fetchLoginAttempts,
  fetchSuspiciousRequests,
} from '../services/fetchlogs';

function Test() {
  const userAppId = "APP123"; // Replace with real appId

  const [activityLogs, setActivityLogs] = useState([]);
  const [blockedIPs, setBlockedIPs] = useState([]);
  const [loginAttempts, setLoginAttempts] = useState([]);
  const [suspiciousRequests, setSuspiciousRequests] = useState([]);
  useEffect(() => {
    const loadLogs = async () => {
      const [activity, blocked, login, suspicious] = await Promise.all([
        fetchActivityLogs(userAppId),
        fetchBlockedIPs(userAppId),
        fetchLoginAttempts(userAppId),
        fetchSuspiciousRequests(userAppId),
      ]);
      setActivityLogs(activity);
      setBlockedIPs(blocked);
      setLoginAttempts(login);
      setSuspiciousRequests(suspicious);
    };

    loadLogs();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <section>
        <h2 className="text-xl font-semibold">📄 Activity Logs</h2>
        {activityLogs.length === 0 ? <p>No logs.</p> : (
          <ul>
            {activityLogs.map(log => (
              <li key={log.id}>
                {log.ip} — {log.message}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold">🚫 Blocked IPs</h2>
        {blockedIPs.length === 0 ? <p>No blocked IPs.</p> : (
          <ul>
            {blockedIPs.map(entry => (
              <li key={entry.id}>
                {entry.ip} — Blocked until: {new Date(entry.blockedUntil).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold">🔐 Login Attempts</h2>
        {loginAttempts.length === 0 ? <p>No login attempts.</p> : (
          <ul>
            {loginAttempts.map(attempt => (
              <li key={attempt.id}>
                {attempt.ip} — {attempt.status}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold">⚠️ Suspicious Requests</h2>
        {suspiciousRequests.length === 0 ? <p>No suspicious requests.</p> : (
          <ul>
            {suspiciousRequests.map(req => (
              <li key={req.id}>
                {req.ip} — Reason: {req.reason}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Test;
