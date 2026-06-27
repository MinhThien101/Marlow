// Marlow UI primitives — the shared building blocks every screen uses.
// Rebuilt to match the Marlow design system (tokens.css). Plain React + inline styles.
import React from 'react'

/* ---------------------------------------------------------------- Button */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  iconLeft,
  iconRight,
  disabled = false,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false)
  const heights = { sm: 32, md: 40, lg: 48 }
  const pads = { sm: '0 14px', md: '0 18px', lg: '0 24px' }
  const fonts = { sm: 13, md: 14.5, lg: 16 }

  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
    height: heights[size], padding: pads[size], width: fullWidth ? '100%' : undefined,
    fontFamily: 'var(--font-sans)', fontSize: fonts[size], fontWeight: 600,
    borderRadius: 'var(--radius-md)', border: '1px solid transparent',
    cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.6 : 1,
    transition: 'background 140ms, border-color 140ms, box-shadow 140ms, transform 80ms',
    whiteSpace: 'nowrap', userSelect: 'none',
  }
  const variants = {
    primary: {
      background: hover && !disabled ? 'var(--accent-hover)' : 'var(--accent)',
      color: 'var(--text-on-ember)',
      boxShadow: disabled ? 'none' : 'var(--shadow-ember)',
    },
    secondary: {
      background: hover && !disabled ? 'var(--surface-hover)' : 'var(--surface-card)',
      color: 'var(--text-body)', borderColor: 'var(--border-default)',
      boxShadow: 'var(--shadow-xs)',
    },
    ghost: {
      background: hover && !disabled ? 'var(--surface-hover)' : 'transparent',
      color: 'var(--text-muted)',
    },
    inverse: {
      background: hover && !disabled ? 'var(--neutral-100)' : 'var(--neutral-50)',
      color: 'var(--neutral-900)',
    },
    danger: {
      background: hover && !disabled ? 'var(--red-500)' : 'transparent',
      color: hover && !disabled ? '#fff' : 'var(--danger)', borderColor: 'var(--danger)',
    },
  }
  return (
    <button
      type="button"
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant], ...style }}
      {...rest}
    >
      {iconLeft}{children}{iconRight}
    </button>
  )
}

/* ------------------------------------------------------------ IconButton */
export function IconButton({ size = 'md', label, variant = 'secondary', style, children, ...rest }) {
  const [hover, setHover] = React.useState(false)
  const dim = size === 'sm' ? 32 : 38
  const variants = {
    secondary: {
      background: hover ? 'var(--surface-hover)' : 'var(--surface-card)',
      color: 'var(--text-muted)', border: '1px solid var(--border-default)',
    },
    ghost: { background: hover ? 'var(--surface-hover)' : 'transparent', color: 'var(--text-muted)', border: '1px solid transparent' },
    primary: { background: 'var(--accent)', color: '#fff', border: '1px solid transparent', boxShadow: 'var(--shadow-ember)' },
  }
  return (
    <button
      type="button" aria-label={label} title={label}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ width: dim, height: dim, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-md)', cursor: 'pointer', flex: 'none', transition: 'background 140ms', ...variants[variant], ...style }}
      {...rest}
    >{children}</button>
  )
}

/* ------------------------------------------------------------------ Card */
export function Card({ padding = 'md', interactive = false, selected = false, style, children, ...rest }) {
  const [hover, setHover] = React.useState(false)
  const pads = { none: 0, sm: 14, md: 18, lg: 28 }
  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        background: 'var(--surface-card)',
        border: `1px solid ${selected ? 'var(--border-ember)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: pads[padding],
        boxShadow: selected ? '0 0 0 1px var(--border-ember), var(--shadow-sm)' : (interactive && hover ? 'var(--shadow-md)' : 'var(--shadow-xs)'),
        cursor: interactive ? 'pointer' : 'default',
        transition: 'box-shadow 160ms, border-color 160ms, transform 120ms',
        transform: interactive && hover && !selected ? 'translateY(-1px)' : 'none',
        ...style,
      }}
      {...rest}
    >{children}</div>
  )
}

/* ----------------------------------------------------------------- Input */
export function Input({ size = 'md', prefix, disabled = false, style, ...rest }) {
  const [focus, setFocus] = React.useState(false)
  const h = size === 'lg' ? 52 : 44
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, height: h, padding: '0 14px',
      background: disabled ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: `1px solid ${focus ? 'var(--border-focus)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? 'var(--ring)' : 'var(--shadow-xs)',
      transition: 'box-shadow 140ms, border-color 140ms', ...style,
    }}>
      {prefix}
      <input
        disabled={disabled}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: size === 'lg' ? 16 : 15, color: 'var(--text-strong)', minWidth: 0 }}
        {...rest}
      />
    </div>
  )
}

/* -------------------------------------------------------------- Textarea */
export function Textarea({ style, ...rest }) {
  const [focus, setFocus] = React.useState(false)
  return (
    <textarea
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      style={{
        width: '100%', resize: 'vertical', padding: '13px 15px',
        background: 'var(--surface-card)',
        border: `1px solid ${focus ? 'var(--border-focus)' : 'var(--border-default)'}`,
        borderRadius: 'var(--radius-md)',
        boxShadow: focus ? 'var(--ring)' : 'var(--shadow-xs)',
        fontSize: 15, lineHeight: 1.55, color: 'var(--text-strong)', outline: 'none',
        transition: 'box-shadow 140ms, border-color 140ms', ...style,
      }}
      {...rest}
    />
  )
}

/* ----------------------------------------------------------------- Badge */
export function Badge({ tone = 'neutral', dot = false, size = 'md', style, children }) {
  const tones = {
    neutral: { bg: 'var(--surface-sunken)', fg: 'var(--text-muted)', dotc: 'var(--text-subtle)' },
    success: { bg: 'var(--success-bg)', fg: 'var(--success)', dotc: 'var(--success)' },
    ember:   { bg: 'var(--accent-soft)', fg: 'var(--accent-text)', dotc: 'var(--accent)' },
    warning: { bg: 'var(--warning-bg)', fg: 'var(--warning)', dotc: 'var(--warning)' },
    danger:  { bg: 'var(--danger-bg)', fg: 'var(--danger)', dotc: 'var(--danger)' },
  }
  const t = tones[tone] || tones.neutral
  const sm = size === 'sm'
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: sm ? '2px 8px' : '4px 10px', borderRadius: 'var(--radius-pill)', background: t.bg, color: t.fg, fontSize: sm ? 11 : 12, fontWeight: 600, ...style }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.dotc }} />}
      {children}
    </span>
  )
}

/* ------------------------------------------------------ SegmentedControl */
export function SegmentedControl({ value, onChange, options, fullWidth = false }) {
  return (
    <div style={{ display: 'inline-flex', width: fullWidth ? '100%' : undefined, background: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', padding: 4, gap: 4 }}>
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value} type="button" onClick={() => onChange(o.value)}
            style={{
              flex: fullWidth ? 1 : undefined, padding: '9px 16px', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer',
              background: active ? 'var(--surface-card)' : 'transparent',
              color: active ? 'var(--text-strong)' : 'var(--text-muted)',
              fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: active ? 600 : 500,
              boxShadow: active ? 'var(--shadow-xs)' : 'none', transition: 'background 140ms, color 140ms',
            }}
          >{o.label}</button>
        )
      })}
    </div>
  )
}

/* ---------------------------------------------------------------- Avatar */
export function Avatar({ name = '', src, size = 'md' }) {
  const dim = size === 'sm' ? 30 : 36
  const initials = name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
  if (src) return <img src={src} width={dim} height={dim} alt="" style={{ borderRadius: '50%', objectFit: 'cover' }} />
  return (
    <span style={{ width: dim, height: dim, borderRadius: '50%', background: 'var(--neutral-200)', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, flex: 'none' }}>{initials || '·'}</span>
  )
}

/* --------------------------------------------------------------- Spinner */
export function Spinner({ size = 18, color = 'var(--accent)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ animation: 'mspin 0.8s linear infinite', display: 'block' }}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.4" style={{ opacity: 0.18, color: 'var(--text-subtle)' }} />
      <path d="M12 3 a9 9 0 0 1 9 9" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

/* ---------------------------------------------------------------- Dialog */
export function Dialog({ open, onClose, title, description, width = 460, children }) {
  if (!open) return null
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(28,24,21,0.42)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', maxWidth: width, background: 'var(--surface-card)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', padding: 26, animation: 'mpop 200ms ease' }}
      >
        {title && <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 23, fontWeight: 500, color: 'var(--text-strong)', margin: '0 0 6px' }}>{title}</h2>}
        {description && <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-muted)', margin: '0 0 20px' }}>{description}</p>}
        {children}
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------- Toast */
export function Toast({ tone = 'success', icon, title, description, onClose }) {
  const accent = tone === 'success' ? 'var(--success)' : 'var(--accent)'
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', width: 340, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', padding: '14px 16px', animation: 'mpop 200ms ease' }}>
      <span style={{ width: 30, height: 30, flex: 'none', borderRadius: '50%', background: 'var(--success-bg)', color: accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>{title}</div>
        {description && <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{description}</div>}
      </div>
      {onClose && <button onClick={onClose} style={{ border: 'none', background: 'transparent', color: 'var(--text-subtle)', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>}
    </div>
  )
}

/* ------------------------------------------------------------------ Icon */
// Import ONLY the icons the app uses. `import * as Lucide` pulls the entire
// icon library into the bundle (thousands of components, ~1MB) and defeats
// tree-shaking. Naming each icon lets the bundler drop the rest, which is the
// single biggest cut to first-paint size. Add a name here when you use a new one.
import {
  AlertCircle, AlignLeft, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, BookOpen,
  Check, ChevronRight, ChevronsUpDown, CodeXml, Copy, Download, FileText,
  GitBranch, GripVertical, ImagePlus, LayoutGrid, LayoutPanelTop, LogOut, Mail,
  MessageSquare, Package, PenLine, Pencil, Plus, Quote, RefreshCw, RotateCcw,
  SlidersHorizontal, Sparkle, Sparkles, Sprout, Tag, ThumbsDown, ThumbsUp,
  Upload, X,
} from 'lucide-react'

const ICONS = {
  AlertCircle, AlignLeft, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, BookOpen,
  Check, ChevronRight, ChevronsUpDown, CodeXml, Copy, Download, FileText,
  GitBranch, GripVertical, ImagePlus, LayoutGrid, LayoutPanelTop, LogOut, Mail,
  MessageSquare, Package, PenLine, Pencil, Plus, Quote, RefreshCw, RotateCcw,
  SlidersHorizontal, Sparkle, Sparkles, Sprout, Tag, ThumbsDown, ThumbsUp,
  Upload, X,
}

export function Icon({ name, size = 20, stroke = 1.75, color = 'currentColor', style }) {
  const Cmp = ICONS[name]
  if (!Cmp) return null
  return <Cmp size={size} strokeWidth={stroke} color={color} style={{ display: 'block', flex: 'none', ...style }} />
}
