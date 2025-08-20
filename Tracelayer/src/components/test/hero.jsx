"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, LogIn } from 'lucide-react'

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold font-mono tracking-tight"
            style={{
              background: "linear-gradient(135deg, #00d9ff 0%, #ffffff 50%, #00d9ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 20px rgba(0, 217, 255, 0.3))",
            }}
          >
            TraceLayer
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Plug-and-Play API Security & Monitoring Middleware
          </motion.p>
          <span className="text-sm bg-gray-800 px-3 py-1 rounded-full text-cyan-300 font-mono">Built for Express.js</span>

          <motion.p
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Secure your backend with one line of code.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Button
              onClick={() => window.location.href = '/dev-register'}
              size="lg"
              className="bg-transparent border-2 border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-black transition-all duration-300 font-mono text-lg px-8 py-3 hover:shadow-[0_0_20px_rgba(0,217,255,0.5)]"
            >
              Get Started
            </Button>

            <Button
              onClick={() => window.location.href = '/login'}
              variant="ghost"
              size="lg"
              className="text-gray-300 hover:text-[#00d9ff] transition-all duration-300 font-mono text-lg group"
            >
              <LogIn className="mr-2 h-5 w-5 group-hover:drop-shadow-[0_0_10px_rgba(0,217,255,0.8)]" />
              Sign In
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
