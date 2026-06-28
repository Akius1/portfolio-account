import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { fingerprint } = await req.json();

  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { data: { user } } = await supabase.auth.getUser();

  // Try to upsert — unique constraints prevent duplicates
  const { error } = await supabase.from("likes").insert({
    post_id: post.id,
    user_id: user?.id ?? null,
    fingerprint: user ? null : fingerprint,
  });

  if (error && error.code !== "23505") {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { count } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", post.id);

  return NextResponse.json({ count: count ?? 0 });
}
