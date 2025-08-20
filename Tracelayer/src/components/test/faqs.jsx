
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQs() {
  const faqs = [
    {
      question: "How easy is it to integrate TraceLayer?",
      answer:
        "TraceLayer is designed for zero-configuration setup. Simply install the package and add one line of middleware to your Express, Koa, or Fastify application. No complex configuration files or setup required.",
    },
    {
      question: "What frameworks does TraceLayer support?",
      answer:
        "TraceLayer supports Express."
    },
    {
      question: "Does TraceLayer impact performance?",
      answer:
        "TraceLayer is built for performance with minimal overhead. Our middleware adds less than 1ms latency per request and uses efficient algorithms for threat detection and logging.",
    },
    {
      question: "Can I customize the security rules?",
      answer:
        "Yes! TraceLayer is fully modular and extensible. You can customize rate limiting rules, add custom threat detection patterns, and configure logging preferences through a simple configuration object.",
    },
  ]

  return (
    <section className="py-20 px-4 bg-slate-800">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-[#00d9ff] mb-4">FAQs</h2>
          <p className="text-xl text-gray-400">Everything you need to know about TraceLayer.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-slate-900 border border-slate-700 rounded-lg px-6 hover:border-[#00d9ff] transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-mono text-white hover:text-[#00d9ff] transition-colors duration-300">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 leading-relaxed pt-2">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
