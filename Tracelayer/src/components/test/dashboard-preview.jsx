import { motion } from "framer-motion"

export function DashboardPreview() {
  return (
    <section className="py-20 px-4 bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-[#00d9ff] mb-4">Dashboard Preview</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real-time monitoring and threat detection at your fingertips.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 40px rgba(0, 217, 255, 0.3)",
          }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-2xl p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-b-2xl p-8 border-2 border-slate-700 hover:border-[#00d9ff] transition-all duration-500">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-mono text-[#00d9ff]">TraceLayer Dashboard</h3>
                <div className="flex space-x-4">
                  <div className="text-sm">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-green-400 ml-2">● Active</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <div className="text-sm text-gray-400">Requests Today</div>
                  <div className="text-2xl font-mono text-[#00d9ff]">12,847</div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <div className="text-sm text-gray-400">Blocked IPs</div>
                  <div className="text-2xl font-mono text-red-400">23</div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                  <div className="text-sm text-gray-400">Threats Detected</div>
                  <div className="text-2xl font-mono text-yellow-400">7</div>
                </div>
              </div>

              <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                <div className="text-sm text-gray-400 mb-3">Recent Activity</div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-red-400">🚨 Brute force attempt blocked</span>
                    <span className="text-gray-500">192.168.1.100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-400">⚠️ Rate limit exceeded</span>
                    <span className="text-gray-500">10.0.0.45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#00d9ff]">✅ API call logged</span>
                    <span className="text-gray-500">203.0.113.1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
