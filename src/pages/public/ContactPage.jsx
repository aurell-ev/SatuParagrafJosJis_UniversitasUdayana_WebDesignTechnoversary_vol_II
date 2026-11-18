import { ContactHero } from '../../components/contact/ContactHero'
import { ContactInfoCards } from '../../components/contact/ContactInfoCards'
import { ContactForm } from '../../components/contact/ContactForm'
import { StatusCheckCard } from '../../components/contact/StatusCheckCard'
import { FaqSection } from '../../components/contact/FaqSection'
import { ScrollReveal } from '../../components/common/ScrollReveal'

export function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-surface">
        {/* 1. Hero Section */}
        <ContactHero />

        {/* 2. Main Content Container */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 sm:space-y-16">
          <ContactInfoCards />

          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <ContactForm />
              </div>
              <div className="lg:col-span-5">
                <StatusCheckCard />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="bg-white pt-6 sm:pt-10">
        <FaqSection />
      </div>
    </div>
  )
}
