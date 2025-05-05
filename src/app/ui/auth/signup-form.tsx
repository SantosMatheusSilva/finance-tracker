'use client'
import React from "react"
import { useActionState, useEffect } from "react";
import {Form, Input, Button} from "@heroui/react";
import { createUser } from "@/app/lib/services/userServices";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    const [ prevState, formAction, isPending ] = useActionState(createUser, {
        message: '',
        error: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });
    
    const router = useRouter();
    // Redirect to login page after successful signup
    useEffect(() => {
        if (prevState?.message === 'User created successfully') {
            router.push('/auth/login');
        }
    }, [prevState, router]);


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
                errorMessage= {prevState?.error?.username}

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
                errorMessage={prevState?.message?.email}
                
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
                />
            </div>
            <div>
                <Button
                type="submit"
                size="lg"
                color="default"
                variant="bordered"
                className="w-full dark:border-white"
                isLoading={isPending}
                disabled={isPending}
                >
                    Signup
                </Button>
            </div>
            <div>
                {/* error message */}
                {prevState?.error && <p>{prevState.error}</p>} 
            </div>
        </Form>
        )
}