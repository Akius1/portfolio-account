export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  role: "reader" | "admin";
  created_at: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  cover_url: string | null;
  content: object;
  content_html: string | null;
  excerpt: string | null;
  tags: string[];
  reading_time: number | null;
  status: "draft" | "published";
  author_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author?: Profile;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string | null;
  parent_id: string | null;
  body: string;
  is_approved: boolean;
  created_at: string;
  author?: Profile;
  replies?: Comment[];
}

export interface Like {
  id: string;
  post_id: string;
  user_id: string | null;
  fingerprint: string | null;
  created_at: string;
}
