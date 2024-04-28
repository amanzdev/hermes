import type {Metadata} from "next";
import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login | Hermes",
  description: "Hermes",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <LoginForm/>
      <span className="text-sm">Powered by <a className="underline" target="_blank" href="https://github.com/amanzdev/hermes">hermes.</a></span>
    </main>
  )
}
