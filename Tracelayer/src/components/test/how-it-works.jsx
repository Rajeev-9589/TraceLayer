import { motion } from "framer-motion"

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Install",
      code: "npm install git+<https://github.com/Rajeev-9589/PlugandPlayTraceLayer>",
    },
    {
      step: "02",
      title: "Import",
      code: "import { traceLayer } from 'tracelayer'",
    },
    {
      step: "03",
      title: "Protect",
      code: "app.use(traceLayer())",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-[#00d9ff] mb-4">How It Works</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Three lines of code. Enterprise security. Zero configuration.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center space-x-6 p-4 rounded-lg bg-slate-800 border border-slate-700 hover:border-[#00d9ff] transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00d9ff] text-black font-bold font-mono flex items-center justify-center text-lg">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-mono text-white mb-2">{step.title}</h3>
                  <code className="text-[#00d9ff] font-mono text-sm bg-black px-3 py-1 rounded">{step.code}</code>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-800 rounded-lg p-6 border border-slate-700"
          >
            <div className="bg-slate-900 rounded-lg p-6 font-mono text-sm">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-400 ml-4">terminal</span>
              </div>
              <div className="space-y-2">
                <div className="text-gray-400">$ npm install tracelayer</div>
                <div className="text-[#00d9ff]">✓ TraceLayer installed successfully</div>
                <div className="text-gray-400 mt-4"># app.js</div>
                <div className="text-blue-400">import</div>
                <span className="text-white"> {"{ traceLayer }"} </span>
                <div className="text-blue-400">from</div>
                <span className="text-yellow-400"> 'tracelayer'</span>
                <div className="mt-2">
                  <span className="text-white">app.</span>
                  <span className="text-blue-400">use</span>
                  <span className="text-white">(</span>
                  <span className="text-yellow-400">traceLayer</span>
                  <span className="text-white">())</span>
                </div>
                <div className="text-[#00d9ff] mt-4">🛡️ API secured and monitored</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
