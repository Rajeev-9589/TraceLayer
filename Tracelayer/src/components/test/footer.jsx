import { motion } from "framer-motion"
import { Github, Twitter, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-4 bg-slate-900 border-t border-[#00d9ff] border-opacity-30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0"
        >
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold font-mono text-[#00d9ff] mb-2">TraceLayer</h3>
            <p className="text-gray-400 font-mono">Plug-and-Play API Security & Monitoring</p>
          </div>

          <div className="flex space-x-6">
            <motion.a
              href="https://github.com/Rajeev-9589"
              whileHover={{ scale: 1.1 }}
              className="text-gray-400 hover:text-[#00d9ff] transition-colors duration-300"
            >
              <Github className="h-6 w-6" />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              className="text-gray-400 hover:text-[#00d9ff] transition-colors duration-300"
            >
              <Twitter className="h-6 w-6" />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              className="text-gray-400 hover:text-[#00d9ff] transition-colors duration-300"
            >
              <MessageCircle className="h-6 w-6" />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-slate-700 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 font-mono text-sm">© 2024 TraceLayer. Open source security middleware.</p>

            <div className="flex space-x-6 text-sm font-mono">
              <a href="https://github.com/Rajeev-9589" className="text-gray-400 hover:text-[#00d9ff] transition-colors duration-300">
                GitHub
              </a>
              <a href="/docs" className="text-gray-400 hover:text-[#00d9ff] transition-colors duration-300">
                Docs
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00d9ff] transition-colors duration-300">
                Discord
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
