import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Menu, X, Shield, Zap, Book } from 'lucide-react'

export function Navigation({ isDocsPage = false, isDashboard = false }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('traceLayerUser')
    setIsLoggedIn(!!userData)

    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 20)
      setIsCollapsed(scrollY > 200) // Collapse after scrolling 200px
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Features", href: "#features", icon: Shield },
    { name: "Setup", href: "#how-it-works", icon: Zap },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('traceLayerUser')
    setIsLoggedIn(false)
    window.location.href = '/'
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 shadow-2xl shadow-[#00d9ff]/10"
            : "backdrop-blur-md bg-slate-900/60 border border-slate-700/30"
        }`}
        style={{
          borderRadius: "50px",
          padding: isCollapsed ? "8px 20px" : "8px 16px",
        }}
      >
        <div className="flex items-center space-x-6">
          {/* Logo for Landing Page (always visible) */}
          {!isDocsPage && !isDashboard && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => scrollToSection("#hero")}
            >
              <div className="w-8 h-8 rounded-full bg-[#00d9ff] flex items-center justify-center">
                <Shield className="h-4 w-4 text-slate-900" />
              </div>
              <span className="font-mono font-bold text-white text-lg">TraceLayer</span>
            </motion.div>
          )}

          {/* Desktop Navigation for Landing Page (Features, Setup, Docs, GitHub) - only when NOT collapsed */}
          {!isCollapsed && !isDocsPage && !isDashboard && (
            <>
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => (
                  <motion.button
                    key={item.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.href)}
                    className="px-4 py-2 rounded-full text-gray-300 hover:text-[#00d9ff] hover:bg-slate-800/50 transition-all duration-200 font-mono text-sm flex items-center space-x-2"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </motion.button>
                ))}
              </div>

              {/* Docs Link */}
              <div className="hidden md:flex items-center">
                <motion.a
                  href="/docs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-full text-gray-300 hover:text-[#00d9ff] hover:bg-slate-800/50 transition-all duration-200 font-mono text-sm flex items-center space-x-2"
                >
                  <Book className="h-4 w-4" />
                  <span>Docs</span>
                </motion.a>
              </div>

              {/* GitHub Link */}
              <div className="hidden md:flex items-center">
                <motion.a
                  href="https://github.com/Rajeev-9589/PlugandPlayTraceLayer"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full text-gray-400 hover:text-[#00d9ff] hover:bg-slate-800/50 transition-all duration-200"
                >
                  <Github className="h-5 w-5" />
                </motion.a>
              </div>
            </>
          )}

          {/* Docs/Dashboard page navigation */}
          {(isDocsPage || isDashboard) && (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => window.location.href = '/'}
              >
                <div className="w-8 h-8 rounded-full bg-[#00d9ff] flex items-center justify-center">
                  <Shield className="h-4 w-4 text-slate-900" />
                </div>
                <span className="font-mono font-bold text-white text-lg">TraceLayer</span>
              </motion.div>

              <motion.a
                href="/docs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full transition-all duration-200 font-mono text-sm flex items-center space-x-2 ${
                  isDocsPage 
                    ? 'text-[#00d9ff] bg-slate-800/50' 
                    : 'text-gray-300 hover:text-[#00d9ff] hover:bg-slate-800/50'
                }`}
              >
                <Book className="h-4 w-4" />
                <span>Docs</span>
              </motion.a>

              {isLoggedIn && (
                <motion.a
                  href="/dashboard"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full transition-all duration-200 font-mono text-sm ${
                    isDashboard 
                      ? 'text-[#00d9ff] bg-slate-800/50' 
                      : 'text-gray-300 hover:text-[#00d9ff] hover:bg-slate-800/50'
                  }`}
                >
                  Dashboard
                </motion.a>
              )}

              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full text-gray-400 hover:text-[#00d9ff] hover:bg-slate-800/50 transition-all duration-200"
              >
                <Github className="h-5 w-5" />
              </motion.a>

              {isLoggedIn && (
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-full text-gray-300 hover:text-red-400 hover:bg-slate-800/50 transition-all duration-200 font-mono text-sm"
                >
                  Logout
                </motion.button>
              )}
            </>
          )}

          {/* Get Started button - always visible on landing page, but changes appearance */}
          {!isDocsPage && !isDashboard && (
            <motion.div layout>
              <Button
                onClick={() => window.location.href = '/dev-register'}
                size="sm"
                className={`font-mono font-semibold px-6 py-2 rounded-full transition-all duration-200 ${
                  isCollapsed
                    ? "bg-transparent border-2 border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-black hover:shadow-[0_0_20px_rgba(0,217,255,0.5)]"
                    : "bg-[#00d9ff] text-slate-900 hover:bg-[#00b8e6] hover:shadow-lg hover:shadow-[#00d9ff]/25"
                }`}
              >
                Get Started
              </Button>
            </motion.div>
          )}

          {/* Mobile Menu Button - always visible on landing page */}
          {!isDocsPage && !isDashboard && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-gray-400 hover:text-[#00d9ff] hover:bg-slate-800/50 transition-all duration-200"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          )}
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-80 md:hidden"
          >
            <div className="backdrop-blur-xl bg-slate-900/90 border border-slate-700/50 rounded-3xl p-6 shadow-2xl shadow-[#00d9ff]/10">
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.href)}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:text-[#00d9ff] hover:bg-slate-800/50 transition-all duration-200 font-mono"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </motion.button>
                ))}

                <div className="border-t border-slate-700 pt-4 space-y-3">
                  <motion.a
                    href="/docs"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:text-[#00d9ff] hover:bg-slate-800/50 transition-all duration-200 font-mono"
                  >
                    <Book className="h-5 w-5" />
                    <span>Docs</span>
                  </motion.a>

                  <motion.a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:text-[#00d9ff] hover:bg-slate-800/50 transition-all duration-200 font-mono"
                  >
                    <Github className="h-5 w-5" />
                    <span>GitHub</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
