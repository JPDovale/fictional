export interface ProjectFile {
  id: string;
  name: string;
  password: string | null;
  type: 'book' | 'rpg' | 'game-history' | 'roadmap';
  structure: 'snowflake' | 'three-acts' | 'hero-journey';
  created_at: Date;
  updated_at: Date;
  features: string;
  image_url: string | null;
  image_filename: string | null;
  user_id: string;
}
