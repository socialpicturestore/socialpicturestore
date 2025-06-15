import { Header } from '@/widgets/header'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Header is_auth />
      <main>{children}</main>
    </div>
  )
}
