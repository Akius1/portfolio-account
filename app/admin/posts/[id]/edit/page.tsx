import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import PostEditor from "@/components/editor/PostEditor";
import type { Post } from "@/types/blog";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) notFound();

  return <PostEditor post={post as Post} />;
}
