'use client'
import Image from 'next/image'

export function AdminLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 0' }}>
      <Image
        src="/images/logo.jpeg"
        alt="Pentium Travel"
        width={180}
        height={60}
        style={{ objectFit: 'contain', height: '60px', width: 'auto' }}
        priority
      />
    </div>
  )
}
