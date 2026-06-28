"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function AuthCodeRedirect() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      // Supabase fell back to Site URL — forward to the real callback handler
      window.location.replace(`/auth/callback?code=${encodeURIComponent(code)}&next=/admin`);
    }
  }, [searchParams]);

  return null;
}
