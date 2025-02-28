import LoginForm from '@/app/ui/auth/login-form'



export default function LoginPage() {
    

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