import { motion } from "framer-motion"
import { Code, Rocket, Users } from "lucide-react"

export function WhoItsFor() {
  const audiences = [
    {
      title: "Indie Devs",
      icon: Code,
      description: "Solo developers who need enterprise security without the complexity",
    },
    {
      title: "Startup Teams",
      icon: Rocket,
      description: "Fast-moving teams that can't afford security vulnerabilities",
    },
    {
      title: "Backend Engineers",
      icon: Users,
      description: "Engineers who want plug-and-play security for their APIs",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-[#00d9ff] mb-4">Who It's For</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built for developers who value security, simplicity, and speed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(0, 217, 255, 0.2)",
              }}
              className="text-center p-8 rounded-lg bg-slate-800 border border-slate-700 hover:border-[#00d9ff] transition-all duration-300 group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#00d9ff] bg-opacity-10 flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-300">
                <audience.icon className="h-8 w-8 text-[#00d9ff] group-hover:drop-shadow-[0_0_10px_rgba(0,217,255,0.8)]" />
              </div>
              <h3 className="text-xl font-mono text-white mb-4 group-hover:text-[#00d9ff] transition-colors duration-300">
                {audience.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{audience.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
