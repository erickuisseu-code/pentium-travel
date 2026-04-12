import type { Metadata } from 'next'

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
  return <main className="min-h-screen flex flex-col">{children}</main>
}
