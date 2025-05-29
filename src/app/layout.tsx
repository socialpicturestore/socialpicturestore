import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import { Header } from '@/widgets/header'
import StoreProvider from '@/app/providers/StoreProvider'
import Script from 'next/script'

const interSans = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'SPAртанцы',
  description: 'Продам гараж',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${interSans.variable} antialiased`}>
        <StoreProvider>
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
