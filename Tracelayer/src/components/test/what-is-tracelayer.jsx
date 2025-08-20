import { motion } from "framer-motion"
import { Check } from "lucide-react"

export function WhatIsTraceLayer() {
  const benefits = ["Fast setup", "Monitor logs", "Stop brute-force attacks"]

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-[#00d9ff] mb-8">What is TraceLayer?</h2>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            A lightweight, plug-and-play middleware that adds enterprise-grade security monitoring to your API endpoints
            without the complexity.
          </motion.p>

          <motion.p
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Deploy advanced threat detection, rate limiting, and activity logging in minutes, not months.
          </motion.p>

          <motion.div
            className="grid md:grid-cols-3 gap-6 pt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-slate-800 border border-slate-700 hover:border-[#00d9ff] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <Check className="h-5 w-5 text-[#00d9ff]" />
                <span className="text-gray-300 font-mono">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
