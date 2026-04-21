// Placeholder Supabase database types.
// Generate the real ones with:
//   npx supabase gen types typescript --project-id igtwzuxufrdflhmwuzpq > src/types/database.ts
// (Requires `npx supabase login` first.)

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          avatar_url: string | null
          role: "admin" | "editor" | "viewer"
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & {
          id: string
        }
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>
        Relationships: []
      }
      posts: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string | null
          content: string | null
          featured_image_url: string | null
          featured_image_alt: string | null
          author_id: string | null
          status: "draft" | "scheduled" | "published" | "archived"
          published_at: string | null
          reading_time_minutes: number | null
          seo_title: string | null
          seo_description: string | null
          og_image_url: string | null
          canonical_url: string | null
          noindex: boolean
          wp_original_id: number | null
          wp_original_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database["public"]["Tables"]["posts"]["Row"]> & {
          slug: string
          title: string
        }
        Update: Partial<Database["public"]["Tables"]["posts"]["Row"]>
        Relationships: []
      }
      categories: {
        Row: {
          id: string
          slug: string
          name: string
          description: string | null
          parent_id: string | null
          order_index: number
          seo_title: string | null
          seo_description: string | null
          wp_original_id: number | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database["public"]["Tables"]["categories"]["Row"]> & {
          slug: string
          name: string
        }
        Update: Partial<Database["public"]["Tables"]["categories"]["Row"]>
        Relationships: []
      }
      tags: {
        Row: {
          id: string
          slug: string
          name: string
          description: string | null
          wp_original_id: number | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database["public"]["Tables"]["tags"]["Row"]> & {
          slug: string
          name: string
        }
        Update: Partial<Database["public"]["Tables"]["tags"]["Row"]>
        Relationships: []
      }
      authors: {
        Row: {
          id: string
          slug: string
          name: string
          bio: string | null
          avatar_url: string | null
          email: string | null
          wp_original_id: number | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database["public"]["Tables"]["authors"]["Row"]> & {
          slug: string
          name: string
        }
        Update: Partial<Database["public"]["Tables"]["authors"]["Row"]>
        Relationships: []
      }
      testimonials: {
        Row: {
          id: string
          slug: string | null
          client_name: string
          project_title: string | null
          description: string | null
          location: string | null
          youtube_url: string | null
          youtube_video_id: string | null
          thumbnail_url: string | null
          order_index: number
          is_featured: boolean
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database["public"]["Tables"]["testimonials"]["Row"]> & {
          client_name: string
        }
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Row"]>
        Relationships: []
      }
      certifications: {
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string | null
          issuer: string | null
          issued_year: number | null
          valid_until: string | null
          order_index: number
          is_featured: boolean
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database["public"]["Tables"]["certifications"]["Row"]> & {
          title: string
        }
        Update: Partial<Database["public"]["Tables"]["certifications"]["Row"]>
        Relationships: []
      }
      services: {
        Row: {
          id: string
          slug: string
          title: string
          short_description: string | null
          content: string | null
          icon: string | null
          featured_image_url: string | null
          gallery_images: Json | null
          features: Json | null
          cta_text: string | null
          cta_url: string | null
          order_index: number
          is_featured: boolean
          is_published: boolean
          seo_title: string | null
          seo_description: string | null
          og_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database["public"]["Tables"]["services"]["Row"]> & {
          slug: string
          title: string
        }
        Update: Partial<Database["public"]["Tables"]["services"]["Row"]>
        Relationships: []
      }
      pages: {
        Row: {
          id: string
          slug: string
          title: string
          content: string | null
          template: string | null
          is_system: boolean
          is_published: boolean
          seo_title: string | null
          seo_description: string | null
          og_image_url: string | null
          noindex: boolean
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database["public"]["Tables"]["pages"]["Row"]> & {
          slug: string
          title: string
        }
        Update: Partial<Database["public"]["Tables"]["pages"]["Row"]>
        Relationships: []
      }
      contact_submissions: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string | null
          subject: string | null
          message: string
          service_interest: string | null
          source_page: string | null
          status: "new" | "read" | "replied" | "archived" | "spam"
          ip_address: string | null
          user_agent: string | null
          referrer: string | null
          internal_notes: string | null
          read_at: string | null
          replied_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database["public"]["Tables"]["contact_submissions"]["Row"]> & {
          full_name: string
          email: string
          message: string
        }
        Update: Partial<Database["public"]["Tables"]["contact_submissions"]["Row"]>
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          value: Json | null
          description: string | null
          category: string | null
          is_public: boolean
          updated_at: string
        }
        Insert: Partial<Database["public"]["Tables"]["site_settings"]["Row"]> & {
          key: string
        }
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Row"]>
        Relationships: []
      }
      redirects: {
        Row: {
          id: string
          old_path: string
          new_path: string
          status_code: number
          is_active: boolean
          notes: string | null
          hit_count: number
          last_hit_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database["public"]["Tables"]["redirects"]["Row"]> & {
          old_path: string
          new_path: string
        }
        Update: Partial<Database["public"]["Tables"]["redirects"]["Row"]>
        Relationships: []
      }
      post_categories: {
        Row: { post_id: string; category_id: string }
        Insert: { post_id: string; category_id: string }
        Update: Partial<{ post_id: string; category_id: string }>
        Relationships: []
      }
      post_tags: {
        Row: { post_id: string; tag_id: string }
        Insert: { post_id: string; tag_id: string }
        Update: Partial<{ post_id: string; tag_id: string }>
        Relationships: []
      }
      google_reviews_cache: {
        Row: {
          id: string
          place_id: string
          review_id: string | null
          author_name: string | null
          author_photo_url: string | null
          rating: number | null
          text: string | null
          language: string | null
          review_time: string | null
          raw_response: Json | null
          fetched_at: string
        }
        Insert: Partial<Database["public"]["Tables"]["google_reviews_cache"]["Row"]> & {
          place_id: string
        }
        Update: Partial<Database["public"]["Tables"]["google_reviews_cache"]["Row"]>
        Relationships: []
      }
      google_reviews_sync_state: {
        Row: {
          place_id: string
          last_fetched_at: string | null
          total_rating: number | null
          total_reviews_count: number | null
          raw_response: Json | null
          updated_at: string
        }
        Insert: Partial<Database["public"]["Tables"]["google_reviews_sync_state"]["Row"]> & {
          place_id: string
        }
        Update: Partial<Database["public"]["Tables"]["google_reviews_sync_state"]["Row"]>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean }
      is_editor_or_admin: { Args: Record<string, never>; Returns: boolean }
    }
    Enums: {
      user_role: "admin" | "editor" | "viewer"
      post_status: "draft" | "scheduled" | "published" | "archived"
      contact_status: "new" | "read" | "replied" | "archived" | "spam"
    }
    CompositeTypes: Record<string, never>
  }
}
