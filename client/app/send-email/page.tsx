import type { Metadata } from 'next'
import SendEmailPage from '@/components/page/SendEmailPage'
import React from 'react'

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Syed Omer Ali for project inquiries, collaborations, or just to say hi. I'm always open to discussing new ideas and opportunities.",
  alternates: {
    canonical: "/send-email",
  },
  openGraph: {
    title: "Contact | Syed Omer Ali",
    description:
      "Contact Syed Omer Ali for project inquiries, collaborations, or just to say hi. I'm always open to discussing new ideas and opportunities.",
    url: "/send-email",
    images: [
      {
        url: "https://www.syedomer.me/og.png",
        width: 1200,
        height: 630,
        alt: "Contact - Syed Omer Ali",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Syed Omer Ali",
    description:
      "Contact Syed Omer Ali for project inquiries, collaborations, or just to say hi. I'm always open to discussing new ideas and opportunities.",
    images: ["https://www.syedomer.me/og.png"],
  },
};

const SendEmail = () => {
  return (
    <main>
      <SendEmailPage />
    </main>
  )
}

export default SendEmail
