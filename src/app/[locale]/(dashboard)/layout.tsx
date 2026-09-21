import Aside from '@/widgets/Aside'
import Content from '@/widgets/Content'
import Header from '@/widgets/Header'
import Layout from '@/widgets/Layout'

export default async function DashboardLayout({ children }: LayoutProps<'/[locale]'>) {
  return (
    <main>
      <Header />
      <Layout>
        <Aside />
        <Content>
          {children}
        </Content>
      </Layout>
    </main>
  )
}
