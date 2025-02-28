
import { 
    Divider,
    Link
 } from "@nextui-org/react";


export default function Page() {


    return(
        <main className="w-svh bg-black">
            <div className="my-10 mx-5 p-3 bg-black border rounded-full border-solid w-fit">
                <h1 className="text-3xl md:text-3xl">Finance Tracker</h1>
            </div>
            <div className="flex-col md:flex-row items-center justify-center gap-3 my-10 mx-5 ">
                <div>
                    <h1 className="text-3xl md:text-6xl">Start now with <br /><strong>Finance Tracker</strong></h1>
                    <Divider className=" my-4 w-32 border-solid " />
                    <p className="text-xl md:text-2xl">Track your expenses and incomes with ease.</p>
                    <Link href="/auth/signup" size="lg" className="my-5 text-xl text-white rounded-2xl p-1 px-2 border border-solid hover:scale-110 ">
                    <p>Signup</p> 
                    </Link>
                </div>
                <div>

                </div>
            </div>
        </main>
        
    )
}