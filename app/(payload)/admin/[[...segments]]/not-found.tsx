import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap'
import config from '../../../../payload/payload.config'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

const NotFound = ({ params, searchParams }: Args) =>
  NotFoundPage({ config: Promise.resolve(config), importMap, params, searchParams })

export default NotFound
