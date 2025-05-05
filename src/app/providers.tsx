
import {HeroUIProvider} from "@heroui/react"
import { SessionProvider } from 'next-auth/react'
import { auth } from 'auth';

export default async function Providers({children}: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
    </SessionProvider>
  )
}