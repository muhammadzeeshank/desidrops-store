"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod schemas
const emailSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

const codeSchema = z.object({
  code: z.string().min(6, "Enter the 6-digit code"),
});

export default function SignIn() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [step, setStep] = useState<"start" | "verify">("start");
  const [error, setError] = useState("");
  const router = useRouter();

  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const codeForm = useForm({
    resolver: zodResolver(codeSchema),
    defaultValues: { code: "" },
  });

  const handleStart = async (data: { email: string }) => {
    if (!signIn || !isLoaded) return;

    try {
      const createdSignIn = await signIn.create({
        identifier: data.email,
      });
      const emailFactor = createdSignIn.supportedFirstFactors?.find(
        (factor) => factor.strategy === "email_code"
      );

      if (!emailFactor || !emailFactor.emailAddressId) {
        throw new Error("Email factor not supported or missing emailAddressId");
      }

      await signIn.prepareFirstFactor({
        strategy: "email_code",
        emailAddressId: emailFactor.emailAddressId,
      });

      setStep("verify");
    } catch (err: unknown) {
      let message = "An unknown error occurred";

      if (err instanceof Error) {
        message = err?.message;
      }
      setError(message || "Failed to send verification code");
    }
  };

  const handleVerify = async (data: { code: string }) => {
    if (!signIn || !isLoaded) return;

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code: data.code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        setError("Verification incomplete");
      }
    } catch (err: unknown) {
      let message = "An unknown error occurred";

      if (err instanceof Error) {
        message = err?.message;
        setError(message || "Invalid code");
      }
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="w-full max-w-md space-y-6">
      <h1 className="text-xl font-semibold">
        {step === "start" ? "Sign in" : "Enter verification code"}
      </h1>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {step === "start" ? (
        <form
          onSubmit={emailForm.handleSubmit(handleStart)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground ">
              Enter your email and we’ll send you a verification code.
            </p>
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" {...emailForm.register("email")} />
            {emailForm.formState.errors.email && (
              <p className="text-sm text-red-500">
                {emailForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      ) : (
        <form
          onSubmit={codeForm.handleSubmit(handleVerify)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input id="code" type="text" {...codeForm.register("code")} />
            {codeForm.formState.errors.code && (
              <p className="text-sm text-red-500">
                {codeForm.formState.errors.code.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Verify & Sign In
          </Button>
        </form>
      )}
    </div>
  );
}
