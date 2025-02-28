'use client'
import React from "react"
import { useActionState } from "react";
import {Form, Input, Button} from "@nextui-org/react";

export default function SignupForm() {
    const [formAction, errorMessage, isPending] = useActionState(() => Promise.resolve(), undefined);


    return (
            
        <Form /* action={formAction} */ validationBehavior="native" className="justify-center items-center w-64  md:w-96 h-auto py-5 space-y-4 border-2 border-black my-5 mx-8 rounded-2xl dark:shadow-lg dark:border-white">
            <div className="flex flex-col gap-4 max-w-md">
                <Input
                required
                label="User Name"
                labelPlacement="outside"
                placeholder="Enter your Name"
                name="name"
                id="name"
                type="text"
                errorMessage="please enter a valid name"

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
                >
                    Signup
                </Button>
            </div>
            <div>
                {/* error message */}
               {/*  {errorMessage && (
                    <>
                    <p>{errorMessage}</p>
                    </>
                )} */}
            </div>
        </Form>
    )
}