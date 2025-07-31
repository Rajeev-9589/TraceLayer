import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Card, CardContent,CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [suspicious, setSuspicious] = useState([]);
  const [rateLimit, setRateLimit] = useState(0);
  const [appName, setAppName] = useState("");
  const [username, setusername] = useState("");
  const [loading, setLoading] = useState(true);
  const [testResponse, setTestResponse] = useState(null);
  const [cooldownIps, setCooldownIps] = useState([
    { ip: "192.168.1.1", cooldownUntil: Date.now() + 5 * 60 * 1000 },
  ]);
    console.log(rateLimit)
  const appId = localStorage.getItem("appId");
  const apiKey = localStorage.getItem("apiKey");
  useEffect(() => {
    const fetchRateLimit = async () => {
      try {
        const response = await axios.get(`/api/devuser/ratelimit/${appId}`);
        setRateLimit(response.data.rateLimit);
      } catch (error) {
        console.error('Error fetching rate limit:', error);
        setRateLimit('Error');
      } finally {
        setLoading(false);
      }
    };

    fetchRateLimit();
  }, [appId]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activityRes, suspiciousRes, appRes] = await Promise.all([
          axios.get(`http://localhost:5500/api/activities/${appId}`),
          axios.get(`http://localhost:5500/api/datarateslimit/${appId}`),
          axios.get(`http://localhost:5500/api/app/${appId}`),
        ]);
        setLogs(activityRes.data);
        setSuspicious(suspiciousRes.data);
        setAppName(appRes.data.appName);
        setusername(appRes.data.username)
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [appId]);

  const updateRateLimit = async () => {
    try {
      const res = await axios.post(`http://localhost:5500/tracelayer/set-limit/${appId}`, {
        limit: rateLimit,
      });
      alert(res.data.message);
    } catch (err) {
      console.error("Failed to set rate limit", err);
    }
  };

  const testRateLimitedEndpoint = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/protected/fakeapi", {
        headers: {
          "x-api-key": apiKey,
        },
      });
      setTestResponse(response.data.message || JSON.stringify(response.data));
    } catch (error) {
      setTestResponse(error.response?.data?.message || "Request failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 md:p-10 bg-gray-50 min-h-screen"
    >
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-indigo-700">Welcome, Dev {username ? username.charAt(0).toUpperCase() + username.slice(1) : "..."}👋</h1>
        <div className="mt-4 space-y-3 bg-indigo-50 p-4 rounded-md border border-indigo-200">
          <p className="text-base text-indigo-700 font-semibold">
            Connected App:&nbsp;
            <span className="text-gray-900">
              {appName ? appName.charAt(0).toUpperCase() + appName.slice(1) : "Loading..."}
            </span>
          </p>

          <p className="text-base font-medium text-gray-800">
            App ID:&nbsp;
            <span className="font-mono bg-white px-2 py-1 rounded-md border text-gray-900">
              {localStorage.getItem("appId") || "Unavailable"}
            </span>
          </p>

          <p className="text-base font-medium text-gray-800">
            API Key:&nbsp;
            <span className="font-mono bg-white px-2 py-1 rounded-md border text-gray-900 break-all">
              {localStorage.getItem("apiKey") || "Unavailable"}
            </span>
          </p>
        </div>

      </div>

      <Tabs defaultValue="activity" className="mt-6">
        <TabsList className="mb-6 bg-indigo-100/30 rounded-md p-1">
          <TabsTrigger value="activity">Activity Logs</TabsTrigger>
          <TabsTrigger value="suspicious">Suspicious Requests</TabsTrigger>
          <TabsTrigger value="iprate">Rate Limit & Routes</TabsTrigger>
          <TabsTrigger value="cooldown">Cooldown IPs</TabsTrigger>
        </TabsList>

        {/* Activity Logs */}
        <TabsContent value="activity">
          <ScrollArea className="h-[400px]">
            {loading ? (
              <div className="text-center text-sm text-gray-500">Loading activity logs...</div>
            ) : logs.length === 0 ? (
              <div className="text-center text-sm text-gray-500">No activity yet.</div>
            ) : (
              logs.map((log, i) => (
                <Card key={i} className="mb-2 hover:shadow-md transition">
                  <CardContent className="text-sm p-4 space-y-1">
                    <div><strong>IP:</strong> {log.ip}</div>
                    <div><strong>Route:</strong> {log.route}</div>
                    <div><strong>Time:</strong> {new Date(log.timestamp).toLocaleString()}</div>
                  </CardContent>
                </Card>
              ))
            )}
          </ScrollArea>
        </TabsContent>

        {/* Suspicious Logs */}
 <TabsContent value="suspicious">
  <ScrollArea className="h-[400px] space-y-2 px-2 py-2">
    {loading ? (
      <div className="flex items-center justify-center h-full text-sm text-gray-500">
        Loading suspicious activity...
      </div>
    ) : suspicious.length === 0 ? (
      <div className="text-center text-sm text-gray-400">
        No suspicious activity detected.
      </div>
    ) : (
      suspicious.map((log, i) => (
        <div
          key={i}
          className="border border-red-300/50 bg-white rounded-md shadow-sm hover:shadow-md transition duration-150"
        >
          <div className="flex justify-between items-center p-2 text-xs text-gray-800">
            <div className="flex flex-col space-y-0.5">
              <div>
                <span className="font-medium text-gray-700">IP:</span> {log.ip}
              </div>
              <div>
                <span className="font-medium text-gray-700">Path:</span> {log.path}
              </div>
              <div>
                <span className="font-medium text-gray-700">Reason:</span> {log.reason}
              </div>
               <div>
                <span className="font-medium text-gray-700">Count:</span> {log.count}
              </div>
            </div>
            <div className="text-[10px] text-gray-500 pl-4 whitespace-nowrap">
              {new Date(log.timestamp).toLocaleString()}
            </div>
          </div>
        </div>
      ))
    )}
  </ScrollArea>
</TabsContent>



        {/* Rate Limit */}
        <TabsContent value="iprate">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Set Rate Limit (req/min)</label>
              <Input
                type="number"
                min="1"
                value={rateLimit}
                onChange={(e) => setRateLimit(Number(e.target.value))}
                className="max-w-xs"
              />
              <Button onClick={updateRateLimit} className="mt-2">
                Update Limit
              </Button>
            </div>
            <div>
              <Button onClick={testRateLimitedEndpoint}>Test Rate-Limited Endpoint</Button>
              {testResponse && (
                <p className="mt-2 text-sm text-gray-700">
                  <strong>Response:</strong> {testResponse}
                </p>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Cooldown IPs */}
        <TabsContent value="cooldown">
          <h2 className="text-md font-semibold mb-3">Temporarily Blocked IPs</h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {cooldownIps.map((entry, i) => (
              <li key={i}>
                {entry.ip} — Cooldown ends at{" "}
                {new Date(entry.cooldownUntil).toLocaleTimeString()}
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground mt-2">
            (Note: Cooldown list is currently dummy data.)
          </p>
        </TabsContent>


      </Tabs>
    </motion.div>
  );
}
