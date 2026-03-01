import { getServerSession } from "next-auth/next";      
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/app/ui/auth/login-form";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  } 


    return (
        <main className=''>
            <div className=''>
                <h1 className='justify-center text-center text-2xl'>
                    <strong>Login</strong>
                </h1>
                <div>
                    <LoginForm />
                </div>
            </div>
            
        </main>
    )
}
