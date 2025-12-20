import React, { useState } from 'react'
import Navbar from '../components/dashboard/Navbar'
import { Hero } from '../components/dashboard/Hero'
import { Features } from '../components/dashboard/Features'
import { HowItWorks } from '../components/dashboard/HowItWorks'
import { Impact } from '../components/dashboard/Impact'
import { CTA } from '../components/dashboard/CTA'
import { Footer } from '../components/dashboard/Footer'
import { VoiceInterface } from '../components/dashboard/VoiceInterface'
// sign-in / sign-up are now dedicated pages at /signin and /signup

export default function Dashboard() {
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
