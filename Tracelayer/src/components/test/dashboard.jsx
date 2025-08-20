import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/test/navigation"
import { MotionBackground } from "@/components/test/motion-background"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Activity, AlertTriangle, Users, Globe, Clock, TrendingUp, Settings, RefreshCw, Download, Filter, Search, MoreVertical, Eye, Ban, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import {
  fetchActivityLogs,
  fetchBlockedIPs,
  fetchLoginAttempts,
  fetchSuspiciousRequests
} from "@/components/services/fetchlogs"

// Helper to format timestamps
const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'N/A';
  // Check if timestamp is a Firebase Timestamp object
  if (typeof timestamp.toDate === 'function') {
    return new Date(timestamp.toDate()).toLocaleString();
  }
  // Check if timestamp is a number (milliseconds)
  if (typeof timestamp === 'number') {
    return new Date(timestamp).toLocaleString();
  }
  // Assume it's an ISO string or similar
  return new Date(timestamp).toLocaleString();
};

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState('overview')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [userData, setUserData] = useState(null)
  const [activityLogs, setActivityLogs] = useState([])
  const [blockedIPsData, setBlockedIPsData] = useState([])
  const [loginAttempts, setLoginAttempts] = useState([])
  const [suspiciousRequests, setSuspiciousRequests] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  const fetchDashboardData = useCallback(async (appId) => {
    setLoadingData(true)
    setFetchError(null)
    try {
      const [
        activityLogsRes,
        blockedIPsRes,
        loginAttemptsRes,
        suspiciousRequestsRes
      ] = await Promise.all([
        fetchActivityLogs(appId),
        fetchBlockedIPs(appId),
        fetchLoginAttempts(appId),
        fetchSuspiciousRequests(appId)
      ])

      setActivityLogs(activityLogsRes)
      setBlockedIPsData(blockedIPsRes)
      setLoginAttempts(loginAttemptsRes)
      setSuspiciousRequests(suspiciousRequestsRes)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setFetchError("Failed to load dashboard data. Please check your Firebase configuration and network connection.")
    } finally {
      setLoadingData(false)
      setIsRefreshing(false) // Ensure refresh state is reset
    }
  }, [])

  useEffect(() => {
    const user = localStorage.getItem('traceLayerUser')
    if (!user) {
      window.location.href = '/login'
      return
    }
    const parsedUser = JSON.parse(user)
    setUserData(parsedUser)

    if (parsedUser.appName) { // Use appName as appId
      fetchDashboardData(parsedUser.appName)
    } else {
      setFetchError("App ID not found in user data. Please re-register.")
      setLoadingData(false)
    }
    
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [fetchDashboardData])

  const handleRefresh = () => {
    setIsRefreshing(true)
    if (userData?.appName) {
      fetchDashboardData(userData.appName)
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'threat':
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-400" />
      case 'success':
        return <CheckCircle className="h-4 w-4 text-[#00d9ff]" />
      default:
        return <Activity className="h-4 w-4 text-gray-400" />
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500/10 text-red-400 border-red-500/20'
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'low':
        return 'bg-[#00d9ff]/10 text-[#00d9ff] border-[#00d9ff]/20'
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  // Combine login attempts and suspicious requests for the 'Threats' tab
  const combinedThreats = [...loginAttempts.map(item => ({
    ...item,
    type: 'login_attempt',
    message: `Failed login attempt for user ${item.userId || 'unknown'}`,
    severity: 'medium',
    displayTimestamp: formatTimestamp(item.timestamp),
    sortTimestamp: new Date(item.timestamp).getTime()
  })),
  ...suspiciousRequests.map(item => ({
    ...item,
    type: 'suspicious_request',
    message: `Suspicious request to ${item.route}: ${item.reason}`,
    severity: 'high',
    displayTimestamp: formatTimestamp(item.timestamp),
    sortTimestamp: new Date(item.timestamp).getTime()
  }))].sort((a, b) => b.sortTimestamp - a.sortTimestamp);


  if (loadingData) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-10 w-10 animate-spin text-[#00d9ff] mx-auto mb-4" />
          <p className="text-xl font-mono text-gray-400">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center p-8 bg-slate-800 rounded-lg border border-red-500/30">
          <AlertCircle className="h-10 w-10 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold font-mono text-red-400 mb-2">Error Loading Data</h2>
          <p className="text-gray-400 mb-4">{fetchError}</p>
          <Button
            onClick={handleRefresh}
            className="bg-red-500 text-white hover:bg-red-600 font-mono"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation isDashboard={true} />
      <MotionBackground />
      
      <div className="relative z-10 pt-20">
        {/* Dashboard Header */}
        <div className="px-6 py-8 border-b border-slate-700/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold font-mono text-[#00d9ff] mb-2">
                  TraceLayer Dashboard
                </h1>
                <p className="text-gray-400">
                  {userData ? `Welcome back, ${userData.appName}` : 'Real-time API security monitoring and threat detection'}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-gray-400">Status</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-green-400 font-mono">Active</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-400">Last Updated</div>
                  <div className="text-white font-mono text-sm">
                    {currentTime.toLocaleTimeString()}
                  </div>
                </div>

                <Button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-gray-300 hover:bg-slate-700 hover:text-white"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg">
              {[
                { id: 'overview', label: 'Overview', icon: Activity },
                { id: 'threats', label: 'Threats', icon: Shield },
                { id: 'blocked', label: 'Blocked IPs', icon: Ban },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md font-mono text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#00d9ff] text-slate-900'
                      : 'text-gray-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Stats Cards - Using mock data for now as real-time aggregation is complex */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-slate-800 border-slate-700 hover:border-[#00d9ff]/30 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">
                        Requests Today
                      </CardTitle>
                      <TrendingUp className="h-4 w-4 text-[#00d9ff]" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold font-mono text-[#00d9ff]">
                        {activityLogs.length.toLocaleString()} {/* Display actual count */}
                      </div>
                      <p className="text-xs text-green-400 mt-1">
                        {/* Placeholder for percentage change */}
                        +XX% from yesterday
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700 hover:border-red-400/30 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">
                        Blocked IPs
                      </CardTitle>
                      <Ban className="h-4 w-4 text-red-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold font-mono text-red-400">
                        {blockedIPsData.length} {/* Display actual count */}
                      </div>
                      <p className="text-xs text-red-400 mt-1">
                        {/* Placeholder for recent blocks */}
                        +X in last hour
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700 hover:border-yellow-400/30 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">
                        Threats Detected
                      </CardTitle>
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold font-mono text-yellow-400">
                        {combinedThreats.length} {/* Display actual count */}
                      </div>
                      <p className="text-xs text-yellow-400 mt-1">
                        {/* Placeholder for threat breakdown */}
                        {loginAttempts.length} login, {suspiciousRequests.length} suspicious
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700 hover:border-green-400/30 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">
                        Active Connections
                      </CardTitle>
                      <Users className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold font-mono text-green-400">
                        {/* Placeholder for active connections */}
                        N/A
                      </div>
                      <p className="text-xs text-green-400 mt-1">
                        {/* Placeholder for peak */}
                        Peak: N/A today
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-mono text-[#00d9ff]">
                        Recent Activity
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="border-slate-600">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm" className="border-slate-600">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activityLogs.length > 0 ? (
                        activityLogs.map((activity) => (
                          <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: activity.id * 0.1 }}
                            className="flex items-center justify-between p-4 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-600 transition-all duration-200"
                          >
                            <div className="flex items-center space-x-4">
                              {getActivityIcon('success')} {/* Default to success for general activity */}
                              <div>
                                <div className="font-mono text-white">
                                  {activity.method} request to {activity.route}
                                </div>
                                <div className="text-sm text-gray-400 mt-1">
                                  <Clock className="h-3 w-3 inline mr-1" />
                                  {formatTimestamp(activity.timestamp)}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge className={`font-mono text-xs ${getSeverityColor('low')}`}>
                                Logged
                              </Badge>
                              <code className="text-gray-400 bg-slate-800 px-2 py-1 rounded text-sm">
                                {activity.ip}
                              </code>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <p className="text-gray-400 text-center font-mono py-8">No activity logs found for this app.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === 'threats' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-mono text-[#00d9ff]">
                        Threats Detected
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search threats..."
                            className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-[#00d9ff] focus:outline-none"
                          />
                        </div>
                        <Button variant="outline" size="sm" className="border-slate-600">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {combinedThreats.length > 0 ? (
                        combinedThreats.map((threat) => (
                          <motion.div
                            key={threat.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center justify-between p-4 rounded-lg bg-slate-900 border border-slate-700 hover:border-red-400/30 transition-all duration-200"
                          >
                            <div className="flex items-center space-x-4">
                              {getActivityIcon(threat.type === 'login_attempt' ? 'warning' : 'threat')}
                              <div>
                                <div className="font-mono text-white">
                                  {threat.message}
                                </div>
                                <div className="text-sm text-gray-400 mt-1">
                                  <Clock className="h-3 w-3 inline mr-1" />
                                  {threat.displayTimestamp}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge className={`font-mono text-xs ${getSeverityColor(threat.severity)}`}>
                                {threat.severity}
                              </Badge>
                              <code className="text-gray-400 bg-slate-800 px-2 py-1 rounded text-sm">
                                {threat.ip}
                              </code>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <p className="text-gray-400 text-center font-mono py-8">No threats detected for this app.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === 'blocked' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-mono text-[#00d9ff]">
                        Blocked IP Addresses
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search IPs..."
                            className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-[#00d9ff] focus:outline-none"
                          />
                        </div>
                        <Button variant="outline" size="sm" className="border-slate-600">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {blockedIPsData.length > 0 ? (
                        blockedIPsData.map((blockedIP, index) => (
                          <motion.div
                            key={blockedIP.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-4 rounded-lg bg-slate-900 border border-slate-700 hover:border-red-400/30 transition-all duration-200"
                          >
                            <div className="flex items-center space-x-4">
                              <Ban className="h-5 w-5 text-red-400" />
                              <div>
                                <code className="text-white font-mono text-lg">
                                  {blockedIP.ip}
                                </code>
                                <div className="text-sm text-gray-400 mt-1">
                                  Blocked: {formatTimestamp(blockedIP.blockedAt)} • {blockedIP.attempts || 0} attempts
                                </div>
                                {blockedIP.unblockAt && (
                                  <div className="text-xs text-gray-500 mt-0.5">
                                    Unblocks: {formatTimestamp(blockedIP.unblockAt)}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge className="bg-red-500/10 text-red-400 border-red-500/20 font-mono">
                                {blockedIP.reason || 'Unknown Reason'}
                              </Badge>
                              <Button variant="outline" size="sm" className="border-slate-600 hover:border-[#00d9ff]">
                                <Eye className="h-4 w-4 mr-2" />
                                Details
                              </Button>
                              <Button variant="outline" size="sm" className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white">
                                Unblock
                              </Button>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <p className="text-gray-400 text-center font-mono py-8">No IPs currently blocked for this app.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-xl font-mono text-[#00d9ff]">
                      App Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                      <span className="text-gray-400 font-mono">App Name:</span>
                      <span className="text-white font-mono">{userData?.appName || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                      <span className="text-gray-400 font-mono">App ID (for fetching):</span>
                      <span className="text-white font-mono">{userData?.appName || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                      <span className="text-gray-400 font-mono">Registered Email:</span>
                      <span className="text-white font-mono">{userData?.email || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-mono">Registration Date:</span>
                      <span className="text-white font-mono">{userData?.registeredAt ? new Date(userData.registeredAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <Button variant="outline" className="w-full border-slate-600 text-gray-300 hover:bg-slate-700 hover:text-white">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage API Keys
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
