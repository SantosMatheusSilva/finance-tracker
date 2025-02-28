import SignupForm from "@/app/ui/auth/signup-form";
import { main } from "framer-motion/client";

export default function SignupPage() {

    return (
        <main>
            <div>
                <h1 className='justify-center text-center text-2xl'>
                    <strong>Signup</strong>
                </h1>
                <div>
                    <SignupForm />
                </div>
            </div>
        </main>

    )
}