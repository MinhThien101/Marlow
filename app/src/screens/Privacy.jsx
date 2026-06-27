import React from 'react'
import { LegalLayout } from '../ui/SiteChrome.jsx'

// Privacy policy. Starter content written to reflect how Marlow actually works
// (Google sign-in only for auth, brand data you provide, exports HTML — never sends).
// Have a lawyer review before relying on it.

const SECTIONS = [
  {
    h: 'Who we are',
    p: ['Marlow is an email studio for solo store founders. It reads your brand, writes and designs campaign emails, and exports clean HTML you send from your own email platform. This policy explains what we collect, why, and the choices you have.'],
  },
  {
    h: 'Information we collect',
    p: ['We keep this deliberately small. We collect:'],
    bullets: [
      'Account details from Google sign-in — your name, email address, and profile photo. We use Google only to sign you in.',
      'Brand information you give us — your store URL, and the logo, colors, fonts, and product details Marlow reads from your public site or that you upload.',
      'Content you create — the prompts you write and the emails Marlow generates and you save.',
      'Basic usage data — for example, how many emails you generate, so we can keep the service running and improve it.',
    ],
  },
  {
    h: 'How we use your information',
    p: ['We use it to provide and improve Marlow: to sign you in, generate on-brand emails, save your work, and support you. We do not sell your personal information, and we do not use your brand or emails to advertise to your customers.'],
  },
  {
    h: 'Your store’s public information',
    p: ['When you connect a brand, Marlow reads information that is already publicly available on your store — your logo, colors, fonts, and a few products. We do not log into your store, and we never ask for your store password or admin access.'],
  },
  {
    h: 'Where your data lives',
    p: ['Your account and brand data are stored with our infrastructure providers, Supabase (database and authentication) and Netlify (hosting). Access is restricted so that your brand and emails are private to your account. We use Google solely for sign-in.'],
  },
  {
    h: 'What we don’t do',
    bullets: [
      'We don’t send emails to your subscribers — Marlow exports the email and you send it from your own platform.',
      'We don’t connect to or read your email platform, subscriber lists, or analytics.',
      'We don’t sell or rent your personal information to anyone.',
    ],
  },
  {
    h: 'Cookies',
    p: ['We use a small number of essential cookies to keep you signed in and the app working. We don’t use advertising cookies.'],
  },
  {
    h: 'Keeping and deleting your data',
    p: ['You can stop using Marlow at any time. If you’d like your account and associated data deleted, email us and we’ll take care of it. We keep data only as long as needed to provide the service or meet legal obligations.'],
  },
  {
    h: 'Your rights',
    p: ['Depending on where you live, you may have the right to access, correct, or delete your personal information, or to object to certain uses. To make a request, contact us at the email below.'],
  },
  {
    h: 'Children',
    p: ['Marlow is for business use and isn’t directed to anyone under 18. We don’t knowingly collect information from children.'],
  },
  {
    h: 'Changes to this policy',
    p: ['As Marlow grows we may update this policy. If we make a meaningful change, we’ll update the date at the top and, where appropriate, let you know in the app.'],
  },
  {
    h: 'Contact',
    p: ['Questions about privacy? Email support@marlow.app and we’ll help.'],
  },
]

export default function Privacy({ go, onSignIn }) {
  return (
    <LegalLayout
      go={go} onSignIn={onSignIn}
      title="Privacy Policy"
      updated="June 20, 2026"
      intro="Marlow is built for one-person stores, and we treat your data the way we’d want ours treated: collect little, keep it private, never sell it. Here’s the detail."
      sections={SECTIONS}
    />
  )
}
