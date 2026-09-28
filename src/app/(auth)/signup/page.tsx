"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { signupSchema, type SignupFormValues } from "@/lib/validators/auth";

const darkInput = [
  "h-11 rounded-xl text-[13px] text-white placeholder:text-slate-600",
  "bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)]",
  "focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500/60",
].join(" ");

const labelStyle = { fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" as const, letterSpacing: "1.5px" };

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (values: SignupFormValues) => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: { name: values.name },
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });
      if (error) throw error;
      toast.success("Account created! Check your email to verify.");
      router.push("/login");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 style={{ fontSize: "26px", fontWeight: 800, color: "white", letterSpacing: "-0.5px", fontFamily: "var(--font-space-grotesk)" }}>
          Create account
        </h1>
        <p style={{ marginTop: "6px", fontSize: "14px", color: "#475569" }}>
          Get started with BoxBuddy for free
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name" style={labelStyle}>Full name</Label>
          <Input
            id="name"
            placeholder="Your name"
            {...register("name")}
            className={`${darkInput} ${errors.name ? "border-red-500/60" : ""}`}
          />
          {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" style={labelStyle}>Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            {...register("email")}
            className={`${darkInput} ${errors.email ? "border-red-500/60" : ""}`}
          />
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" style={labelStyle}>Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              {...register("password")}
              className={`${darkInput} pr-10 ${errors.password ? "border-red-500/60" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: "#475569" }}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword" style={labelStyle}>Confirm password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Re-enter password"
            autoComplete="new-password"
            {...register("confirmPassword")}
            className={`${darkInput} ${errors.confirmPassword ? "border-red-500/60" : ""}`}
          />
          {errors.confirmPassword && <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 text-white text-[13px] font-semibold rounded-xl"
          style={{ background: "linear-gradient(135deg,#059669,#10B981)", boxShadow: "0 6px 20px rgba(16,185,129,0.35)", border: "none" }}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create account
        </Button>
      </form>

      <p style={{ textAlign: "center", fontSize: "14px", color: "#475569" }}>
        Already have an account?{" "}
        <Link href="/login" style={{ fontWeight: 600, color: "#10B981", textDecoration: "none" }}>
          Sign in
        </Link>
      </p>
    </div>
  );
}
