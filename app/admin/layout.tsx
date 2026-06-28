import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/?auth=required");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/");

  return (
    <div style={{ minHeight: "100vh", background: "var(--light)" }}>
      <nav style={{
        background: "var(--dark)", color: "var(--white)",
        padding: "0 24px", height: "60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem" }}>
          AU Admin
        </span>
        <div style={{ display: "flex", gap: "24px", fontSize: "0.875rem" }}>
          <a href="/admin" style={{ color: "var(--gray-400)" }}>Dashboard</a>
          <a href="/admin/posts/new" style={{ color: "var(--gray-400)" }}>New Post</a>
          <a href="/" style={{ color: "var(--gray-400)" }}>← Site</a>
        </div>
      </nav>
      <div style={{ padding: "32px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        {children}
      </div>
    </div>
  );
}
