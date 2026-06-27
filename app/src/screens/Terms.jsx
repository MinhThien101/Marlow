import React from 'react'
import { LegalLayout } from '../ui/SiteChrome.jsx'

// Terms of service. Starter content written for Marlow's beta. Have a lawyer
// review and set the governing-law section before relying on it.

const SECTIONS = [
  {
    h: 'Agreement',
    p: ['These terms are an agreement between you and Marlow. By creating an account or using Marlow, you agree to them. If you don’t agree, please don’t use the service.'],
  },
  {
    h: 'What Marlow does',
    p: ['Marlow helps you write and design marketing campaign emails in your brand and export them as HTML. Marlow does not send emails on your behalf — you send them from your own email platform. Marlow is in beta, so features may change, and parts of it may occasionally be unavailable.'],
  },
  {
    h: 'Your account',
    p: ['You sign in with Google. You’re responsible for keeping access to your Google account secure and for activity that happens under your Marlow account. You must be at least 18 and able to enter into this agreement.'],
  },
  {
    h: 'Your brand and content',
    p: [
      'You keep ownership of your brand assets, prompts, and the emails you create with Marlow. You give us permission to process them only as needed to provide the service to you.',
      'You’re responsible for having the rights to the logos, images, products, and other materials you connect or upload, and for the emails you ultimately send.',
    ],
  },
  {
    h: 'Generated emails',
    p: ['Marlow drafts copy and design to help you move fast, but you’re in control. Review and edit every email before you send it. Marlow doesn’t guarantee specific results, revenue, or that emails will display or deliver perfectly in every inbox — sending, deliverability, and list management happen in your own email platform.'],
  },
  {
    h: 'Acceptable use',
    p: ['Please use Marlow lawfully. Don’t use it to create misleading, infringing, or unlawful content, to spam, or to attempt to disrupt, reverse-engineer, or gain unauthorized access to the service.'],
  },
  {
    h: 'Plans and billing',
    p: ['Paid plans are billed monthly and run from $29 to $99 per month. You can upgrade, downgrade, or cancel anytime; changes take effect on your next billing cycle, and there’s no long-term contract. During beta, early founders keep their beta pricing as Marlow grows.'],
  },
  {
    h: 'Beta',
    p: ['Marlow is offered during beta on an “as is” and “as available” basis while we build. We may add, change, or remove features, and we’ll do our best to give you a heads-up about significant changes.'],
  },
  {
    h: 'Our intellectual property',
    p: ['Marlow — including the app, its design, and underlying software — belongs to us. These terms don’t give you any rights to the Marlow name or product beyond using the service as intended.'],
  },
  {
    h: 'Disclaimers and liability',
    p: ['To the fullest extent allowed by law, Marlow is provided without warranties, and we aren’t liable for indirect or consequential losses arising from your use of the service. Nothing here limits liability that can’t be limited by law.'],
  },
  {
    h: 'Ending the agreement',
    p: ['You can stop using Marlow and cancel at any time. We may suspend or end access if these terms are broken or if needed to protect the service or other users.'],
  },
  {
    h: 'Changes to these terms',
    p: ['We may update these terms as Marlow evolves. If we make a meaningful change, we’ll update the date above and, where appropriate, let you know in the app. Continuing to use Marlow means you accept the updated terms.'],
  },
  {
    h: 'Contact',
    p: ['Questions about these terms? Email support@marlow.app.'],
  },
]

export default function Terms({ go, onSignIn }) {
  return (
    <LegalLayout
      go={go} onSignIn={onSignIn}
      title="Terms of Service"
      updated="June 20, 2026"
      intro="The plain-language deal for using Marlow during beta. We’ve kept it short and readable."
      sections={SECTIONS}
    />
  )
}
