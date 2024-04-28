import type {Metadata} from "next";
import {login} from "@/app/auth/login/actions";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import React from "react";

export const metadata: Metadata = {
  title: "Login | Hermes",
  description: "Hermes",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link href="#" className="ml-auto inline-block text-sm underline">
                                Forgot your password?
                            </Link>
                        </div>
                        <Input id="password" type="password" name="password" required/>
                    </div>
                    <Button type="submit" className="w-full" formAction={login}>
                        Login
                    </Button>
                    <Button variant="outline" className="w-full">
                        Login with Google
                    </Button>
                </form>
            </CardContent>
        </Card>
      <span className="text-sm">Powered by <a className="underline" target="_blank" href="https://github.com/amanzdev/hermes">hermes.</a></span>
    </main>
  )
}
