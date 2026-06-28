// Klaviyo-ready HTML export for the non-generated send types. DESIGNED sends
// export the compiled MJML output from /api/design-email; TEXT_BASED sends are a
// simple personal-note layout, so we serialize them to table-based inline-CSS
// HTML here (the founder letter never needs the full design generator). SMS has
// no HTML body — the Design stage exports its message text directly.
import { safePaper, safeInk } from './email.jsx'

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function textEmailHtml(copy, sb, accent) {
  const T = sb.emailTheme || {}
  const paper = safePaper(T.paper || '#F6F1E7')
  const ink = safeInk(T.ink || '#1A1714')
  const inkSoft = T.inkSoft || ink
  const ac = /^#?[0-9a-f]{6}$/i.test(accent || '') ? accent : (T.accent || '#DD5530')
  const shop = sb.shopUrl || sb.url || '#'
  const serif = "Georgia, 'Times New Roman', serif"
  const sans = "Helvetica, Arial, sans-serif"
  const paras = (copy.body || '').split('\n\n').map((p) => {
    const sig = p.trim().startsWith('-')
    return `<p style="margin:0 0 18px;font-family:${sig ? serif : sans};font-style:${sig ? 'italic' : 'normal'};font-size:${sig ? '18px' : '16px'};line-height:1.7;color:${sig ? ac : inkSoft}">${esc(p)}</p>`
  }).join('')
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>${esc(copy.subject || sb.name)}</title></head>
<body style="margin:0;padding:0;background:${paper}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${paper}"><tr><td align="center" style="padding:32px 16px">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:${paper}">
      <tr><td style="padding:28px 56px 0;text-align:center">
        <div style="font-family:${serif};font-size:20px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:${ac}">${esc(sb.short || sb.name)}</div>
      </td></tr>
      <tr><td style="padding:32px 56px 48px">
        <h1 style="font-family:${serif};font-size:32px;line-height:1.18;font-weight:500;color:${ink};margin:0 0 26px">${esc(copy.subject || '')}</h1>
        ${paras}
        <a href="${esc(shop)}" style="display:inline-block;margin-top:10px;padding:16px 34px;background:${ac};color:${paper};font-family:${sans};font-size:14px;font-weight:700;letter-spacing:1px;text-transform:uppercase;text-decoration:none;border-radius:6px">Shop now</a>
      </td></tr>
      <tr><td style="padding:36px 40px;background:${ink};text-align:center">
        <div style="font-family:${serif};font-size:18px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:${paper};margin-bottom:14px">${esc(sb.short || sb.name)}</div>
        <div style="font-family:${sans};font-size:11px;line-height:1.6;color:${paper};opacity:0.75">© ${new Date().getFullYear()} ${esc(sb.name)}. All rights reserved.<br /><a href="#" style="color:${paper};text-decoration:underline">Unsubscribe</a> · <a href="#" style="color:${paper};text-decoration:underline">Preferences</a></div>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`
}
