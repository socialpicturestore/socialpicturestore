import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'

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
      <body className={`${interSans.variable} antialiased`}>{children}</body>
    </html>
  )
}
