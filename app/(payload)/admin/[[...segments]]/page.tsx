import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = ({ params, searchParams }: Args) =>
  // @ts-ignore
  generatePageMetadata({ config: import('@payload-config'), params, searchParams })

const Page = ({ params, searchParams }: Args) =>
  // @ts-ignore
  RootPage({ config: import('@payload-config'), importMap, params, searchParams })

export default Page
