import { ReactNode } from 'react'

import Section from './_view'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Section>
      {children}
    </Section>
  )
}
