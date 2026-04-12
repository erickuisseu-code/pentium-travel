import type { Metadata } from 'next'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Pentium Travel',
    template: '%s | Pentium Travel',
  },
  description: 'Agence de voyage spécialisée en accompagnement étudiant et visa touristique. Douala · Yaoundé.',
  metadataBase: new URL('https://pentium-travel.com'),
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}
