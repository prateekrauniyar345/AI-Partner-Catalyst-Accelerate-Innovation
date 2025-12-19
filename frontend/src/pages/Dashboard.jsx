import React, { useState } from 'react'
import Navbar from '../components/dashboard/Navbar'
import { Hero } from '../components/dashboard/Hero'
import { Features } from '../components/dashboard/Features'
import { HowItWorks } from '../components/dashboard/HowItWorks'
import { Impact } from '../components/dashboard/Impact'
import { CTA } from '../components/dashboard/CTA'
import { Footer } from '../components/dashboard/Footer'
import { VoiceInterface } from '../components/dashboard/VoiceInterface'
import SignInModal from '../features/auth/SignInModal'
import SignUpModal from '../features/auth/SignUpModal'

export default function Dashboard() {
  const [voiceOpen, setVoiceOpen] = useState(false)
  const [signInOpen, setSignInOpen] = useState(false)
  const [signUpOpen, setSignUpOpen] = useState(false)

  function handleStartLearning() {
    // For now open the voice session modal
    setVoiceOpen(true)
  }

  function openSignIn() { setSignInOpen(true) }
  function openSignUp() { setSignUpOpen(true) }

  return (
    <div className="min-vh-100 bg-white text-dark">
      <a className="visually-hidden" href="#main">Skip to content</a>
      <Navbar onStartLearning={handleStartLearning} onOpenSignIn={openSignIn} onOpenSignUp={openSignUp} />
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
      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} onSuccess={() => { /* optionally refresh UI */ }} />
      <SignUpModal open={signUpOpen} onClose={() => setSignUpOpen(false)} onSuccess={() => { /* optionally refresh UI */ }} />
    </div>
  )
}
