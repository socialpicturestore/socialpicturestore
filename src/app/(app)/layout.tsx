import { Header } from '@/widgets/header'
import { SidebarMenu } from '@/widgets/sidebar'
import s from './layout.module.scss'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={s.layout}>
      <Header is_auth />
      <div className={s.main}>
        <SidebarMenu />
        <main className={s.content}>{children}</main>
      </div>
    </div>
  )
}
