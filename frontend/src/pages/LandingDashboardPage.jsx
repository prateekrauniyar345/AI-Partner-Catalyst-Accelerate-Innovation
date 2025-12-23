import React, { useState } from 'react'
import Navbar from '../components/landingDashboard/Navbar'
import { Hero } from '../components/landingDashboard/Hero'
import { Features } from '../components/landingDashboard/Features'
import { HowItWorks } from '../components/landingDashboard/HowItWorks'
import { Impact } from '../components/landingDashboard/Impact'
import { CTA } from '../components/landingDashboard/CTA'
import { Footer } from '../components/landingDashboard/Footer'
import { VoiceInterface } from '../components/landingDashboard/VoiceInterface'
// sign-in / sign-up are now dedicated pages at /signin and /signup

export default function LandingDashboardPage() {
  const [voiceOpen, setVoiceOpen] = useState(false)
  // sign-in and sign-up are handled on dedicated routes now

  function handleStartLearning() {
    // For now open the voice session modal
    setVoiceOpen(true)
  }

  // navigation to sign in / sign up is handled by the Navbar

  return (
    <div className="min-vh-100 bg-white text-dark">
      <a className="visually-hidden" href="#main">Skip to content</a>
      <Navbar onStartLearning={handleStartLearning} />
      <main id="main">
        <Hero onStartLearning={handleStartLearning} />
        <section id="features">
          <Features />
        </section>
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="impact">
          <Impact />
        </section>
        <CTA onStartLearning={handleStartLearning} />
      </main>
      <Footer />
      {voiceOpen && (
        <VoiceInterface onClose={() => setVoiceOpen(false)} />
      )}
    </div>
  )
}
