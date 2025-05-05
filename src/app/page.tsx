
import { 
    Divider,
    Link
 } from "@heroui/react";


export default function Page() {


    return(
        <>
        <nav className="flex items-center justify-between w-full border-b border-solid border-gray-200 shadow-lg shadow-cyan-400/50 bg-black ">
        <div className="px-3">
            <h1 className="text-3xl font-semibold md:text-3xl"><strong>Finance Tracker</strong></h1>
        </div>
         <div className="px-3">
            <Link href="/auth/login" className="my-5 text-xl justify-center text-white rounded-2xl p-1 px-2 border border-solid hover:bg-white hover:text-black">Login</Link>
         </div>
         </nav>
        <main className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="flex-col items-center justify-center md:items-center gap-3 my-10 mx-5 ">
                <div className="flex flex-col justify-center gap-3">
                    <h1 className="text-3xl md:text-6xl">Start now with <br /><strong>Finance Tracker</strong></h1>
                    <Divider className="justify-items-start my-4 w-32 border-solid " />
                    <p className="text-xl md:text-2xl">Track your expenses and incomes with ease.</p>
                    <Link href="/auth/signup" size="lg" className="text-xl justify-center text-white rounded-2xl p-5 border border-solid hover:bg-white hover:text-black">
                    Signup
                    </Link>
                </div>
                <div>
                </div>
            </div>
        </main>
        </>
    )
}