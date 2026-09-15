import Footer from '@/widgets/Footer/section'
import Header from '@/widgets/Header'

export default async function DashboardLayout({ children }: LayoutProps<'/[locale]'>) {
  return (
    <main className="block">
      <Header />
      <div>{children}</div>
      <Footer />
    </main>
  )
}
