"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Navigation } from "@/components/test/navigation"
import { motion } from "framer-motion"
import { ArrowUp, Book, Code, Shield, Zap, Settings, Cloud, BarChart3, AlertTriangle, HelpCircle } from 'lucide-react'

const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.3);
    border-radius: 3px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #00d9ff 0%, #0ea5e9 100%);
    border-radius: 3px;
    transition: all 0.3s ease;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #0ea5e9 0%, #0284c7 100%);
    box-shadow: 0 0 8px rgba(0, 217, 255, 0.4);
  }
  
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #00d9ff rgba(15, 23, 42, 0.3);
  }
`;

const sections = [
  { title: "Introduction", icon: Book },
  { title: "Installation", icon: Code },
  { title: "Getting Started", icon: Zap },
  { title: "Middleware Setup", icon: Settings },
  { title: "Brute-Force Protection", icon: Shield },
  { title: "Rate Limiting", icon: AlertTriangle },
  { title: "Suspicious Request Logging", icon: BarChart3 },
  { title: "Activity Logging", icon: BarChart3 },
  { title: "IP Blocking", icon: Shield },
  { title: "Cloud Sync", icon: Cloud },
  { title: "Dashboard", icon: BarChart3 },
  { title: "Troubleshooting", icon: Settings },
  { title: "FAQs", icon: HelpCircle },
  { title: "Support", icon: HelpCircle },
]

const contentMap = {
  "Introduction": `TraceLayer is a plug-and-play middleware tool designed for developers to monitor, rate-limit, block IPs, and detect brute-force or suspicious behaviors in their Node.js applications. With a single installation, you get multiple layers of protection and observability.`,
  "Installation": `Install the TraceLayer middleware via:`,
  "Getting Started": `After installation, import and configure TraceLayer:`,
  "Middleware Setup": `The traceMiddleware() function automatically enables:
- Activity logging
- Brute-force protection
- Suspicious request logging
- Rate limiting
- IP blocking with cooldown

Customize behaviors by passing options to the middleware.`,
  "Brute-Force Protection": `TraceLayer monitors login endpoints and logs failed attempts. After X failed attempts (default 5), it blocks the IP temporarily. Use this helper before verifying credentials:`,
  "Rate Limiting": `Limit repeated requests by IP using the rateLimiter middleware.`,
  "Suspicious Request Logging": `Logs suspicious headers (e.g., missing user-agent, malformed IPs, suspicious payloads). Helpful for identifying bot activity or penetration attempts.`,
  "Activity Logging": `Every incoming request (excluding static assets) is logged with:
- IP address
- Path
- Method
- Timestamp
- User-Agent

Stored in local MongoDB by default.`,
  "IP Blocking": `TraceLayer supports:
- Manual IP blocking via admin panel/API
- Automatic cooldown-based blocking on brute-force/rate-limit abuse

Blocked IPs are stored and checked on every request.`,
  "Cloud Sync": `You can optionally sync logs to a cloud Firestore database by calling syncLogsToCloud with your app credentials.`,
  "Dashboard": `Visit the hosted dashboard (or self-host your own) to:
- View live activity logs
- Manage blocked IPs
- Analyze suspicious requests
- Test rate limits
- View app credentials & sync config

Dashboard is optional but enhances visibility.`,
  "Troubleshooting": `- MongoDB connection issues? Ensure your URI is correct and database is running.
- Not logging anything? Check middleware order in Express setup.
- Logs not syncing? Ensure API key and appId are valid.`,
  "FAQs": `**Q: Is TraceLayer production-ready?**
Yes, it's used in production by several projects.

**Q: Can I use only specific features?**
Yes, you can import and use only specific helpers (e.g., just brute-force protection).`,
  "Support": `Need help?
- Raise an issue on GitHub
- Email us: support@tracelayer.io
- Join the community Discord (link coming soon)`
}

const codeSnippets = {
  "Installation": `npm i git+https://github.com/your-username/tracelayer.git`,
  "Getting Started": `const express = require('express');
const { traceMiddleware } = require('tracelayer');

const app = express();

app.use(traceMiddleware({ 
  appId: "your-app-id", 
  apiKey: "your-api-key" 
}));`,
  "Brute-Force Protection": `const { checkLoginRate } = require('tracelayer');

router.post('/login', checkLoginRate, (req, res) => {
  // check credentials
});`,
  "Rate Limiting": `const { rateLimiter } = require('tracelayer');

app.use('/api', rateLimiter, apiRoutes);`,
  "Cloud Sync": `const { syncLogsToCloud } = require('tracelayer');

syncLogsToCloud({ 
  appId: "your-app-id", 
  apiKey: "your-api-key" 
});`
}

export default function DocsPage() {
  useEffect(() => {
    const links = document.querySelectorAll("a[href^='#']")
    links.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault()
        const targetId = link.getAttribute("href")?.substring(1)
        const target = document.getElementById(targetId)
        if (target) target.scrollIntoView({ behavior: "smooth" })
      })
    })
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <style dangerouslySetInnerHTML={{ __html: customScrollbarStyles }} />
      <Navigation isDocsPage={true} />
      
      <div className="flex pt-20">
        {/* Sidebar */}
        <aside className="w-64 sticky top-20 h-[calc(100vh-5rem)] border-r border-slate-700 p-6 overflow-y-auto bg-slate-800/50 backdrop-blur-sm custom-scrollbar">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold font-mono text-[#00d9ff]">TraceLayer Docs</h2>
          </div>
          <nav className="space-y-2">
            {sections.map((section) => (
              <motion.a
                key={section.title}
                href={`#${section.title.replace(/ /g, "-")}`}
                className="flex items-center space-x-3 text-sm text-gray-400 hover:text-[#00d9ff] transition-colors duration-200 p-2 rounded-lg hover:bg-slate-700/50 group"
                whileHover={{ x: 4 }}
              >
                <section.icon className="h-4 w-4 group-hover:text-[#00d9ff]" />
                <span className="font-mono">{section.title}</span>
              </motion.a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 space-y-16 max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-mono text-[#00d9ff] mb-4">
              Documentation
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Complete guide to implementing TraceLayer in your applications
            </p>
          </motion.div>

          {sections.map((section, index) => (
            <motion.section
              key={section.title}
              id={section.title.replace(/ /g, "-")}
              className="scroll-mt-24"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#00d9ff] bg-opacity-10 flex items-center justify-center">
                  <section.icon className="h-5 w-5 text-[#00d9ff]" />
                </div>
                <h2 className="text-3xl font-bold font-mono text-[#00d9ff]">
                  {section.title}
                </h2>
              </div>
              
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-[#00d9ff]/30 transition-all duration-300">
                <p className="text-gray-300 whitespace-pre-line leading-relaxed mb-6">
                  {contentMap[section.title]}
                </p>
                
                {codeSnippets[section.title] && (
                  <div className="mt-6">
                    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-sm text-gray-400 font-mono">code</span>
                      </div>
                      <SyntaxHighlighter 
                        language="javascript" 
                        style={oneDark}
                        customStyle={{ 
                          margin: 0,
                          padding: "1.5rem",
                          background: "transparent",
                          fontSize: "14px"
                        }}
                      >
                        {codeSnippets[section.title]}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                )}
              </div>
            </motion.section>
          ))}

          {/* Back to top button */}
          <motion.div 
            className="flex justify-center mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button 
              variant="outline" 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-slate-900 transition-all duration-300 font-mono"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Back to top
            </Button>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
