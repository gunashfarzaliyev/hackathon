import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Chat from "./Chat"

export default async function Home() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return <Chat user={session.user} />
}
