"use client";

import { useActionState } from "react";
import { loginAction, type FormResult } from "@/lib/adminActions";

const initialState: FormResult | null = null;

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="w-full max-w-sm space-y-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
      <h1 className="text-xl font-bold text-[var(--ink)]">Admin Login</h1>
      {state && !state.ok && <p className="rounded-md bg-[var(--crit-bg)] px-3 py-2 text-sm text-[var(--crit)]">{state.error}</p>}
      <div>
        <label className="block text-sm font-medium text-[var(--ink)]">Password</label>
        <input
          name="password"
          type="password"
          required
          className="mt-1 w-full rounded-md border border-[var(--line)] px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
