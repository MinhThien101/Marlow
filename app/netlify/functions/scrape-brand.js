import { scrapeBrand } from '../../src/lib/scrapeCore.js'

// Best-effort brand reader. Served at /api/scrape-brand in production.
export default async (req) => {
  let url
  try {
    const body = await req.json()
    url = body?.url
  } catch {
    url = undefined
  }
  try {
    const result = await scrapeBrand(url)
    return Response.json(result)
  } catch (e) {
    return Response.json({ ok: false, error: 'Something went wrong reading that site.' })
  }
}

export const config = {
  path: '/api/scrape-brand',
}
