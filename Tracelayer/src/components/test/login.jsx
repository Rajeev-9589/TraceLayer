import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/test/navigation"
import { MotionBackground } from "@/components/test/motion-background"
import { Shield, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsLoading(true)
      setErrors({}) // Clear previous general errors

      try {
        const response = await fetch(`${process.env.PUBLIC_BACKEND_API_URL}/login-Dev`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          }),
        })

        const data = await response.json()

        if (response.ok) {
          // Store current user session with appId from backend
          localStorage.setItem('traceLayerUser', JSON.stringify({
            email: formData.email,
            appName: data.appId, // Use appId from backend response
            loginTime: new Date().toISOString()
          }))
          
          // Redirect to dashboard
          window.location.href = '/dashboard'
        } else {
          setErrors({ general: data.error || "An unexpected error occurred." })
        }
      } catch (error) {
        console.error("Login API Error:", error)
        setErrors({ general: "Network error or server is unreachable." })
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      <Navigation isDocsPage={true} />
      <MotionBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-[#00d9ff]/30 transition-all duration-300">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00d9ff] bg-opacity-10 flex items-center justify-center">
                <Shield className="h-8 w-8 text-[#00d9ff]" />
              </div>
              <h1 className="text-3xl font-bold font-mono text-[#00d9ff] mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-400">
                Sign in to your TraceLayer dashboard
              </p>
            </div>

            {errors.general && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <span className="text-red-400 font-mono text-sm">{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-sm font-mono text-gray-300 mb-2 flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-[#00d9ff]" />
                  <span>Email Address</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="developer@company.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`bg-slate-900 border-slate-600 text-white placeholder-gray-500 font-mono focus:border-[#00d9ff] focus:ring-[#00d9ff] ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1 font-mono">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-mono text-gray-300 mb-2 flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-[#00d9ff]" />
                  <span>Password</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`bg-slate-900 border-slate-600 text-white placeholder-gray-500 font-mono focus:border-[#00d9ff] focus:ring-[#00d9ff] pr-12 ${
                      errors.password ? 'border-red-500' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#00d9ff] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1 font-mono">{errors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#00d9ff] text-slate-900 hover:bg-[#00b8e6] font-mono font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#00d9ff]/25 disabled:opacity-50"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <a href="/dev-register" className="text-[#00d9ff] hover:underline font-mono">
                  Sign up here
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
