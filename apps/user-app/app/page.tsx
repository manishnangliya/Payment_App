import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { NEXT_AUTH } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(NEXT_AUTH);
  if (session?.user) {
    redirect('/dashboard')
  } else {
    redirect('/api/auth/signin')
  }
  
}