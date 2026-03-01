'use client'
import React from "react"
import {
    Form, 
    Input, 
    Button
} from "@heroui/react";
import LoadingSpinner from "@/app/ui/loadingSpinner";
import { useActionState } from "react";
import { signup } from "@/app/auth/signup/action";
import { useRouter } from "next/navigation";   
import { useEffect } from "react"; 

type SignupFormState = {
    success: boolean;
    error?: string;
    errors?: {
      username?: string[];
      email?: string[];
      password?: string[];
      confirmPassword?: string[];
    };
  };

export default function SignupForm() {


    const [ formState, formAction, isPending ] = useActionState<SignupFormState, FormData>(signup, { success: false, errors: {}, error: ''});
    
    const router = useRouter();


   useEffect(() => {
        if (formState.success == true) {
            console.log('redirecting to login page');
            router.push('/auth/login');
        } 
    }, [formState.success, router]);
    
    
    
    return (
        <Form action={formAction} /* method="post" */ validationBehavior="native" className="justify-center items-center w-64  md:w-96 h-auto py-5 space-y-4 border-2 border-black my-5 mx-8 rounded-2xl dark:shadow-lg dark:border-white">
            <div className="flex flex-col gap-4 max-w-md">
                <Input
                required
                label="User Name"
                labelPlacement="outside"
                placeholder="Enter your User Name"
                name="username"
                id="username"
                type="text"
                errorMessage= {formState?.errors?.username?.[0]}

                />
            </div>
            <div className="flex flex-col gap-4 max-w-md">
                <Input
                required
                label="Email"
                labelPlacement="outside"
                placeholder="email@email.com"
                name="email"
                id="email"
                type="email"
                errorMessage={formState?.errors?.email?.[0]}
                
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
                errorMessage={formState?.errors?.password?.[0]}
                
                />
            </div>
            <div className="flex flex-col gap-4 max-w-md">
                <Input
                required
                label="Confirm Password"
                labelPlacement="outside"
                placeholder="Confirm your Password"
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                errorMessage={formState?.errors?.confirmPassword?.[0]}
                />
            </div>
            <div>
                <Button
                type="submit"
                size="lg"
                color="default"
                variant="bordered"
                className="w-full dark:border-white"
                //isLoading={isPending}
                disabled={isPending}
                >
                   {isPending ? <LoadingSpinner /> : 'Sign Up'}
                </Button>
            </div>
            <div>
                {/* error message */}
                {formState?.error && <p className="text-red-500">{(formState.error)}</p>} 
            </div>
        </Form>
        )
}