import { REST_DELETE, REST_GET, REST_PATCH, REST_POST } from '@payloadcms/next/routes'

// @ts-ignore
export const GET    = REST_GET(import('@payload-config'))
// @ts-ignore
export const POST   = REST_POST(import('@payload-config'))
// @ts-ignore
export const DELETE = REST_DELETE(import('@payload-config'))
// @ts-ignore
export const PATCH  = REST_PATCH(import('@payload-config'))
