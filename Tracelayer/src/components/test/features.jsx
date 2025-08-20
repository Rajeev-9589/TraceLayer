import { motion } from "framer-motion"
import { Shield, BarChart3, AlertTriangle, X, Lock, Cloud, Zap, Brain, Package } from "lucide-react"

export function Features() {
  const features = [
    { name: "Rate Limiting", icon: Shield},
    { name: "Activity Logging", icon: BarChart3 },
    { name: "Suspicious Detection", icon: AlertTriangle },
    { name: "IP Blocking", icon: X},
    { name: "Brute-force Protection", icon: Lock},
    { name: "Cloud Log Syncing", icon: Cloud  },
    { name: "Plug-and-Play Middleware", icon: Zap  },
    { name: "Modular & Extendable", icon: Brain },
    { name: "Lightweight & Fast", icon: Package },
  ]

  return (
    <section id="features" className="py-20 px-4 bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-[#00d9ff] mb-4">Features</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to secure your API, built for developers who value simplicity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(0, 217, 255, 0.2)",
              }}
              className="p-6 rounded-lg bg-slate-900 border border-slate-700 hover:border-[#00d9ff] transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-2xl">{feature.emoji}</span>
                <feature.icon className="h-6 w-6 text-[#00d9ff] group-hover:drop-shadow-[0_0_10px_rgba(0,217,255,0.8)]" />
              </div>
              <h3 className="text-lg font-mono text-white group-hover:text-[#00d9ff] transition-colors duration-300">
                {feature.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
