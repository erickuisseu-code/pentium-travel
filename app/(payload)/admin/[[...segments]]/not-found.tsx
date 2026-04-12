import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap'
// @ts-ignore
import config from '@payload-config'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

// @ts-ignore
const NotFound = ({ params, searchParams }: Args) =>
  NotFoundPage({ config, importMap, params, searchParams })

export default NotFound
