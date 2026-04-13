import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Destinations } from './payload/collections/Destinations'
import { HeroSlides } from './payload/collections/HeroSlides'
import { Testimonials } from './payload/collections/Testimonials'
import { Contacts } from './payload/collections/Contacts'
import { Media } from './payload/collections/Media'
import { SocialLinks } from './payload/globals/SocialLinks'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— Pentium Travel Admin',
    },
    components: {
      graphics: {
        Logo: '/payload/components/AdminLogo#AdminLogo',
        Icon: '/payload/components/AdminIcon#AdminIcon',
      },
    },
  },
  collections: [
    Destinations,
    HeroSlides,
    Testimonials,
    Contacts,
    Media,
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
        group: 'Administration',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nom',
        },
      ],
    },
  ],
  globals: [SocialLinks],
  editor: lexicalEditor(),
  sharp,
  secret: process.env.PAYLOAD_SECRET || 'CHANGE_ME_IN_PRODUCTION',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  upload: {
    limits: {
      fileSize: 5_000_000,
    },
  },
})
