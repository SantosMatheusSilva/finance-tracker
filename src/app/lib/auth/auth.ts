// lib/auth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { getUser } from "@/auth";

export function auth() {
  return getServerSession(authOptions);
}

export async function getUserId(): Promise<string> {
  const session = await auth();
  if (!session || !session?.user?.email) {
    throw new Error("Unauthorized");
  }
  const user = await getUser(session.user.email);
  if (!user) {
    throw new Error("User not found");
  }
  return String(user.user_id);
}
