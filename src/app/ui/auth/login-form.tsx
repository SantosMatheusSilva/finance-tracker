'use client'
import React from "react"
import { useEffect } from "react";
import {Form, Input, Button} from "@heroui/react";
import { authenticate } from "@/app/lib/services/userServices";
//import { useFormState } from "react-dom";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/ui/loadingSpinner";
import { useUser } from "@/app/lib/hooks/useUser";


type AuthFormState =  {
    success: true;  redirectTo: string; 
  } | {
    success: false; error: string;
  };

const initialState: AuthFormState = { success: false, error: ''};

export default function LoginForm(){
    const [state, formAction, isPending] = useActionState <AuthFormState, FormData> (authenticate, {success: false, error: ''});
    const router = useRouter();

    useEffect(() => {
        if (state.success && state.redirectTo) {
            router.push(state.redirectTo);
        }
    }, [state, router]);

   
    return (
        <Form action={formAction} /* method="post" */ validationBehavior="native" className="justify-center items-center w-64 md:w-96 h-96 space-y-4 border-2 border-black my-5 mx-8 rounded-2xl dark:shadow-lg dark:border-white"> {/*  dark:shadow-cyan-200/50 */}
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
                    aria-disabled={!!isPending}
                    >
                       {isPending ? <LoadingSpinner /> : 'Login'}
                    </Button>
                </div>
                <div>
                    {/* error message */}
                    {!state.success && state.error && <p className="text-red-500">{state.error}</p>}
                </div>
            </Form>
    )

}