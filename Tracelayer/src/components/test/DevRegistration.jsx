import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/test/navigation"
import { MotionBackground } from "@/components/test/motion-background"
import { ArrowRight, ArrowLeft, Shield, Mail, Package, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react'

export default function DevRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "",
    appName: "",
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateStep1 = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    
    if (!formData.appName) {
      newErrors.appName = "App name is required"
    } else if (formData.appName.length < 3) {
      newErrors.appName = "App name must be at least 3 characters"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}
    
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2)
    }
  }

  const handleBack = () => {
    setCurrentStep(1)
    setErrors({})
  }

  const handleSubmit = async () => {
  if (validateStep2()) {
    setIsLoading(true);
    setErrors({}); // Clear previous errors

    try {
      const response = await fetch(
        `https://tracelayer.onrender.com/api/register-Dev`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            username: formData.email.split("@")[0],
            appname: formData.appName,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Set current user session with appId from backend
        localStorage.setItem(
          "traceLayerUser",
          JSON.stringify({
            email: formData.email,
            appName: data.appId, // Use appId from backend
            loginTime: new Date().toISOString(),
          })
        );

        setIsLoading(false);
        setCurrentStep(3); // Success step
      } else {
        if (data.error === "Email already registered") {
          setErrors({ email: data.error });
          setCurrentStep(1);
        } else if (data.error === "All fields are required") {
          setErrors({ general: data.error });
        } else {
          setErrors({
            general:
              data.error ||
              "An unexpected error occurred during registration.",
          });
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Registration API Error:", error);
      setErrors({ general: "Network error or server is unreachable." });
      setIsLoading(false);
    }
  }
};

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      <Navigation isDocsPage={true} />

      <MotionBackground />
    
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 ${
                currentStep >= 1 ? 'bg-[#00d9ff] text-slate-900' : 'bg-slate-700 text-gray-400'
              }`}>
                1
              </div>
              <div className={`h-1 w-16 rounded transition-all duration-300 ${
                currentStep >= 2 ? 'bg-[#00d9ff]' : 'bg-slate-700'
              }`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 ${
                currentStep >= 2 ? 'bg-[#00d9ff] text-slate-900' : 'bg-slate-700 text-gray-400'
              }`}>
                2
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400 font-mono">
                Step {currentStep} of 2
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Email and App Name */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-[#00d9ff]/30 transition-all duration-300"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00d9ff] bg-opacity-10 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-[#00d9ff]" />
                  </div>
                  <h1 className="text-3xl font-bold font-mono text-[#00d9ff] mb-2">
                    Join TraceLayer
                  </h1>
                  <p className="text-gray-400">
                    Start securing your APIs today
                  </p>
                </div>

                <div className="space-y-6">
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
                    <Label htmlFor="appName" className="text-sm font-mono text-gray-300 mb-2 flex items-center space-x-2">
                      <Package className="h-4 w-4 text-[#00d9ff]" />
                      <span>App Name</span>
                    </Label>
                    <Input
                      id="appName"
                      type="text"
                      placeholder="my-awesome-api"
                      value={formData.appName}
                      onChange={(e) => handleInputChange('appName', e.target.value)}
                      className={`bg-slate-900 border-slate-600 text-white placeholder-gray-500 font-mono focus:border-[#00d9ff] focus:ring-[#00d9ff] ${
                        errors.appName ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.appName && (
                      <p className="text-red-400 text-sm mt-1 font-mono">{errors.appName}</p>
                    )}
                  </div>

                  <Button
                    onClick={handleNext}
                    className="w-full bg-[#00d9ff] text-slate-900 hover:bg-[#00b8e6] font-mono font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#00d9ff]/25"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Password */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-[#00d9ff]/30 transition-all duration-300"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00d9ff] bg-opacity-10 flex items-center justify-center">
                    <Lock className="h-8 w-8 text-[#00d9ff]" />
                  </div>
                  <h1 className="text-3xl font-bold font-mono text-[#00d9ff] mb-2">
                    Secure Your Application
                  </h1>
                  <p className="text-gray-400">
                    Create a strong password for <span className="text-[#00d9ff] font-mono">{formData.appName}</span>
                  </p>
                </div>

                <div className="space-y-6">
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

                  <div>
                    <Label htmlFor="confirmPassword" className="text-sm font-mono text-gray-300 mb-2 flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-[#00d9ff]" />
                      <span>Confirm Password</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`bg-slate-900 border-slate-600 text-white placeholder-gray-500 font-mono focus:border-[#00d9ff] focus:ring-[#00d9ff] pr-12 ${
                          errors.confirmPassword ? 'border-red-500' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#00d9ff] transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-sm mt-1 font-mono">{errors.confirmPassword}</p>
                    )}
                  </div>
                                                                         {errors.general && (
  <div className="bg-red-900/40 border border-red-500 text-red-300 p-3 rounded-lg mb-4 text-center font-mono">
    {errors.general}
  </div>
)}  
                  <div className="flex space-x-4">
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-700 hover:text-white font-mono py-3 rounded-lg transition-all duration-200"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="flex-1 bg-[#00d9ff] text-slate-900 hover:bg-[#00b8e6] font-mono font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#00d9ff]/25 disabled:opacity-50"
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </div> 
                </div>
              </motion.div>
            )}

            {/* Step 3: Success */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-[#00d9ff]/30 transition-all duration-300 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500 bg-opacity-10 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-400" />
                </div>
                
                <h1 className="text-3xl font-bold font-mono text-[#00d9ff] mb-4">
                  Welcome to TraceLayer!
                </h1>
                
                <p className="text-gray-400 mb-2">
                  Your developer account has been created successfully.
                </p>
                
                <div className="bg-slate-900 rounded-lg p-4 mb-6 border border-slate-700">
                  <div className="text-sm text-gray-400 mb-2">Your App Details:</div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="text-[#00d9ff] font-mono">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">App Name:</span>
                      <span className="text-[#00d9ff] font-mono">{formData.appName}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={() => window.location.href = '/dashboard'}
                    className="w-full bg-[#00d9ff] text-slate-900 hover:bg-[#00b8e6] font-mono font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#00d9ff]/25"
                  >
                    Go to Dashboard
                  </Button>
                  
                  <Button
                    onClick={() => window.location.href = '/'}
                    variant="outline"
                    className="w-full border-slate-600 text-gray-300 hover:bg-slate-700 hover:text-white font-mono py-3 rounded-lg transition-all duration-200"
                  >
                    Back to Home
                  </Button>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
