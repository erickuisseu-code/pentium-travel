import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Destinations } from './collections/Destinations'
import { Testimonials } from './collections/Testimonials'
import { Contacts } from './collections/Contacts'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— Pentium Travel Admin',
    },
  },
  collections: [
    Destinations,
    Testimonials,
    Contacts,
    Media,
    // Collection users (admin)
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
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'CHANGE_ME_IN_PRODUCTION',
  typescript: {
    outputFile: path.resolve(dirname, '../payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  upload: {
    limits: {
      fileSize: 5_000_000, // 5MB
    },
  },
})
