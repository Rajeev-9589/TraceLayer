
import { Hero } from "@/components/test/hero"
import { WhatIsTraceLayer } from "@/components/test/what-is-tracelayer"
import { Features } from "@/components/test/features"
import { HowItWorks } from "@/components/test/how-it-works"
import { DashboardPreview } from "@/components/test/dashboard-preview"
import { WhoItsFor } from "@/components/test/who-its-for"
import { FAQs } from "@/components/test/faqs"
import { Team } from "@/components/test/team"
import { Footer } from "@/components/test/footer"
import { MotionBackground } from "@/components/test/motion-background"
import { Navigation } from "@/components/test/navigation"


export default function Home() {

  return (
    <div className="relative min-h-screen bg-slate-900 text-white overflow-hidden">
      <Navigation />
      <MotionBackground />
      <div className="relative z-10">
        <Hero />
        <WhatIsTraceLayer />
        <Features />
        <HowItWorks />
        <DashboardPreview />
        <WhoItsFor />
        <FAQs />
        <Team />
        <Footer />
      </div>
    </div>
  )
}
