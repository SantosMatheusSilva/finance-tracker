'use client'

import { SessionProvider } from 'next-auth/react'
import { HeroUIProvider } from "@heroui/react"
import { Session } from 'next-auth'

export default function SessionWrapper({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session | null
}) {
  return (
    <SessionProvider session={session}>
      <HeroUIProvider>
        {children}
      </HeroUIProvider>
    </SessionProvider>
  )
}