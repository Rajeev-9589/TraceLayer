import { motion } from "framer-motion"
import { Github } from "lucide-react"

export function Team() {
  const contributors = [
    {
      name: "Alex Chen",
      username: "alexchen",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "Core Developer",
    },
    {
      name: "Sarah Kim",
      username: "sarahkim",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "Security Engineer",
    },
    {
      name: "Mike Rodriguez",
      username: "mikerodriguez",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "DevOps Lead",
    },
    {
      name: "Emma Wilson",
      username: "emmawilson",
      avatar: "/placeholder.svg?height=80&width=80",
      role: "Frontend Developer",
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
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-[#00d9ff] mb-4">Contributors</h2>
          <p className="text-xl text-gray-400">Meet the team building the future of API security.</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {contributors.map((contributor, index) => (
            <motion.div
              key={contributor.username}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(0, 217, 255, 0.2)",
              }}
              className="text-center p-6 rounded-lg bg-slate-800 border border-slate-700 hover:border-[#00d9ff] transition-all duration-300 group"
            >
              <div className="relative mb-4">
                <img
                  src={contributor.avatar || "/placeholder.svg"}
                  alt={contributor.name}
                  className="w-20 h-20 rounded-full mx-auto border-2 border-slate-700 group-hover:border-[#00d9ff] transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-[#00d9ff] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>

              <h3 className="text-lg font-mono text-white mb-1 group-hover:text-[#00d9ff] transition-colors duration-300">
                {contributor.name}
              </h3>

              <p className="text-sm text-gray-400 mb-3">{contributor.role}</p>

              <a
                href={`https://github.com/${contributor.username}`}
                className="inline-flex items-center space-x-2 text-gray-400 hover:text-[#00d9ff] transition-colors duration-300 font-mono text-sm"
              >
                <Github className="h-4 w-4" />
                <span>@{contributor.username}</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
