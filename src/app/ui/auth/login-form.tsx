'use client'
import React, { useState } from "react"
import {
    Form, 
    Input, 
    Button
} from "@heroui/react";
import LoadingSpinner from "@/app/ui/loadingSpinner";

import { signIn } from "next-auth/react";
//import { useRouter } from "next/navigation";

export default function LoginForm(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    //const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

         await signIn('credentials', {
            redirect: true,
            email,
            password,
            callbackUrl: '/dashboard'
        });

        setIsLoading(false);

       /*  if (result?.error) {
            setError(result.error);
        } else if (result?.ok) {
            window.location.href = result.url || '/dashboard';
        } else {
            setError('An unexpected error occurred.');
        } */
    };

    return (
        <Form onSubmit={handleSubmit} className="justify-center items-center w-64 md:w-96 h-96 space-y-4 border-2 border-black my-5 mx-8 rounded-2xl dark:shadow-lg dark:border-white">
            <div className="flex flex-col gap-4 max-w-md">
                <Input className=""
                required
                label="Email"
                labelPlacement="outside"
                placeholder="email@email.com"
                name="email"
                id="email"
                type="email"
                errorMessage="please enter a valid email"
                />
            </div>
            <div className="flex flex-col gap-4 max-w-md">
                <Input
                required
                label="Password"
                labelPlacement="outside"
                placeholder="Enter your Password"
                name="password"
                id="password"
                type="password"
                errorMessage="Please enter a valid password"
                />
            </div>
            <div>
                <Button 
                type="submit"
                size="lg"
                color="default"
                variant="bordered"
                className="w-full dark:border-white"
                aria-disabled={isLoading}
                >
                   {isLoading ? <LoadingSpinner /> : 'Login'}
                </Button>
            </div>
            <div>
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </Form>
    )
}