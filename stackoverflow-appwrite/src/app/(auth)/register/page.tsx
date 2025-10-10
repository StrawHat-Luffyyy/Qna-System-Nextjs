"use client";
import React from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/Auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Icons
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconLoader2,
} from "@tabler/icons-react";

// For professional notifications (already added)
import { Toaster, toast } from "sonner";

// Assuming BackgroundBeams is in src/components/ui/background-beams.tsx
// Adjust path if different, e.g., import { BackgroundBeams } from "@/components/BackgroundBeams";
import { BackgroundBeams } from "@/components/ui/background-beams"; // Adjust path if needed

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

export default function RegisterPage() {
  const { createAccount, login } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;

    if (!firstname || !lastname || !email || !password) {
      toast.error("Please fill out all fields.");
      setIsLoading(false);
      return;
    }

    const response = await createAccount(
      `${firstname} ${lastname}`,
      email,
      password
    );

    if (response.error) {
      toast.error(response.error.message);
      setIsLoading(false);
      return;
    }

    const loginResponse = await login(email, password);
    if (loginResponse.error) {
      toast.error(loginResponse.error.message);
    } else {
      toast.success("Account created! Redirecting...");
      // Redirect is handled by your auth layout
    }

    setIsLoading(false);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-md bg-black antialiased md:px-0">
      <Toaster position="top-center" richColors />

      {/* BackgroundBeams component fills the entire space behind the form */}
      <BackgroundBeams className="absolute inset-0 z-0" />

      {/* Your form, positioned on top of the beams */}
      <div className="relative z-10 mx-auto w-full max-w-md rounded-2xl border border-neutral-800 bg-black p-4 shadow-input md:p-8">
        <h2 className="text-xl font-bold text-neutral-200">
          Welcome to Riverflow
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-300">
          Already have an account?{" "}
          <Link href="/login" className="text-orange-500 hover:underline">
            Login
          </Link>
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-4 md:flex-row">
            <div className="flex w-full flex-col space-y-2">
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                name="firstname"
                placeholder="Tyler"
                type="text"
                disabled={isLoading}
              />
            </div>
            <div className="flex w-full flex-col space-y-2">
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                name="lastname"
                placeholder="Durden"
                type="text"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              disabled={isLoading}
            />
          </div>
          <div className="mb-8 flex flex-col space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              disabled={isLoading}
            />
          </div>

          <button
            className="group/btn relative h-10 w-full rounded-md bg-gradient-to-br from-neutral-900 to-neutral-800 font-medium text-white shadow-md transition-all duration-300 hover:from-neutral-800 hover:to-neutral-900 disabled:pointer-events-none disabled:opacity-50"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <IconLoader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Sign up →"
            )}
            <BottomGradient />
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

          <div className="flex flex-col space-y-4">
            <Button variant="outline" type="button" disabled={isLoading}>
              <IconBrandGoogle className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button variant="outline" type="button" disabled={isLoading}>
              <IconBrandGithub className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
