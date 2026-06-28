import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { body, parent_id } = await req.json();

  if (!body || body.trim().length === 0) {
    return NextResponse.json({ error: "Body is required" }, { status: 400 });
  }
  if (body.length > 2000) {
    return NextResponse.json({ error: "Comment too long" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in to comment" }, { status: 401 });
  }

  const { data: post } = await supabase
    .from("posts")
    .select("id")
    .eq("slug", slug)
    .single();

  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { data: comment, error } = await supabase
    .from("comments")
    .insert({
      post_id: post.id,
      author_id: user.id,
      body: body.trim(),
      parent_id: parent_id ?? null,
      is_approved: false,
    })
    .select("*, author:profiles(username, avatar_url)")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ comment });
}
