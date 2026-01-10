/**
 * Example usage of Navigation component
 * 
 * This file demonstrates how to use the Navigation component
 * in your landing page layout.
 */

import Navigation from './Navigation'

export default function NavigationExample() {
  const handleGetStarted = () => {
    // Handle get started action
    console.log('Get Started clicked')
    // You can navigate to a signup page, open a modal, etc.
    // Example: router.push('/signup')
    // Example: setModalOpen(true)
  }

  return (
    <div className="min-h-screen">
      {/* Navigation Component */}
      <Navigation onGetStartedClick={handleGetStarted} />

      {/* Add top padding to account for fixed header */}
      <main className="pt-16 md:pt-20">
        {/* Your page content with sections that have IDs matching navLinks */}
        <section id="features" className="min-h-screen py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-8">Features</h2>
            {/* Features content */}
          </div>
        </section>

        <section id="pricing" className="min-h-screen py-20 bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-8">Pricing</h2>
            {/* Pricing content */}
          </div>
        </section>

        <section id="about" className="min-h-screen py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-8">About</h2>
            {/* About content */}
          </div>
        </section>

        <section id="contact" className="min-h-screen py-20 bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-8">Contact</h2>
            {/* Contact content */}
          </div>
        </section>
      </main>
    </div>
  )
}
