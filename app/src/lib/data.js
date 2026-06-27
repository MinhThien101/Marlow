import { supabase } from './supabase.js'

/* ---------------------------------------------------------------- Brand */
export async function getMyBrand() {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle()
  if (error) throw error
  return data
}

export async function saveBrand(brand) {
  const payload = {
    name: brand.name ?? '',
    store_url: brand.store_url ?? null,
    logo_url: brand.logo_url ?? null,
    palette: brand.palette ?? [],
    fonts: brand.fonts ?? [],
    accent: brand.accent ?? '#DD5530',
    accent2: brand.accent2 ?? '#C19A53',
    paper: brand.paper ?? '#F4EFE4',
    ink: brand.ink ?? '#22201C',
    voice_notes: brand.voice_notes ?? null,
    updated_at: new Date().toISOString(),
  }
  if (brand.id) {
    const { data, error } = await supabase.from('brands').update(payload).eq('id', brand.id).select().single()
    if (error) throw error
    return data
  }
  const { data, error } = await supabase.from('brands').insert(payload).select().single()
  if (error) throw error
  return data
}

/* -------------------------------------------------------------- Products */
export async function getProducts(brandId) {
  const { data, error } = await supabase
    .from('products').select('*').eq('brand_id', brandId)
    .order('sort', { ascending: true }).order('created_at', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function replaceProducts(brandId, products) {
  await supabase.from('products').delete().eq('brand_id', brandId)
  if (!products.length) return []
  const rows = products.map((p, i) => ({
    brand_id: brandId,
    title: p.title ?? '',
    price: p.price ?? null,
    image_url: p.image_url ?? null,
    url: p.url ?? null,
    sort: i,
  }))
  const { data, error } = await supabase.from('products').insert(rows).select()
  if (error) throw error
  return data ?? []
}

/* ---------------------------------------------------- Brand asset upload */
export async function uploadBrandAsset(file, folder = 'products') {
  const { data: u } = await supabase.auth.getUser()
  const uid = u?.user?.id
  if (!uid) throw new Error('Not signed in')
  const ext = (file.name?.split('.').pop() || 'png').toLowerCase()
  const path = `${uid}/${folder}/${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from('brand-assets').upload(path, file, {
    cacheControl: '3600', upsert: false, contentType: file.type || undefined,
  })
  if (error) throw error
  const { data } = supabase.storage.from('brand-assets').getPublicUrl(path)
  return data.publicUrl
}

/* ---------------------------------------------------------------- Emails */
export async function getEmails() {
  const { data, error } = await supabase
    .from('emails').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function getEmail(id) {
  const { data, error } = await supabase.from('emails').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function createEmail(email) {
  const { data, error } = await supabase.from('emails').insert({
    brand_id: email.brand_id,
    name: email.name ?? 'Untitled campaign',
    campaign_type: email.campaign_type ?? 'promo',
    prompt: email.prompt ?? null,
    subject: email.subject ?? null,
    preview_text: email.preview_text ?? null,
    body_html: email.body_html ?? null,
    doc: email.doc ?? null,
    featured: email.featured ?? [],
    status: email.status ?? 'draft',
  }).select().single()
  if (error) throw error
  return data
}

export async function updateEmail(id, patch) {
  const { data, error } = await supabase.from('emails')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function logEvent(emailId, type) {
  try { await supabase.from('generation_events').insert({ email_id: emailId, type }) }
  catch (_) { /* non-critical */ }
}
