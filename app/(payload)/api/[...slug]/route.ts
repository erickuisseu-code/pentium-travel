import { REST_DELETE, REST_GET, REST_PATCH, REST_POST } from '@payloadcms/next/routes'
// @ts-ignore
import config from '@payload-config'

// @ts-ignore
export const GET    = REST_GET(config)
// @ts-ignore
export const POST   = REST_POST(config)
// @ts-ignore
export const DELETE = REST_DELETE(config)
// @ts-ignore
export const PATCH  = REST_PATCH(config)
