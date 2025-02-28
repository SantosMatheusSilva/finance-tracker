'use client'
import React from "react"
import { useActionState } from "react";
import {Form, Input, Button} from "@nextui-org/react";

export default function LoginForm(){
const [formAction, errorMessage, isPending] = useActionState(() => Promise.resolve(), undefined);


    return (
        <Form /* action={formAction} */ validationBehavior="native" className="justify-center items-center w-64 md:w-96 h-96 space-y-4 border-2 border-black my-5 mx-8 rounded-2xl dark:shadow-lg dark:border-white"> {/*  dark:shadow-cyan-200/50 */}
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
                    Login
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