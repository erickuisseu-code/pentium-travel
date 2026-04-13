'use client'
import Image from 'next/image'

export function AdminIcon() {
  return (
    <Image
      src="/images/logo.jpeg"
      alt="Pentium Travel"
      width={40}
      height={40}
      style={{ objectFit: 'contain', width: '40px', height: '40px', borderRadius: '4px' }}
      priority
    />
  )
}
