
/* import {HeroUIProvider} from "@heroui/react"
import { SessionProvider } from 'next-auth/react' */
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import SessionWrapper from "./session-wrapper";

export default async function Providers({children}: { children: React.ReactNode }) {
  const session =  await getServerSession(authOptions);
  return (
    <SessionWrapper session={session}>
      {children}
    </SessionWrapper>
  )
}