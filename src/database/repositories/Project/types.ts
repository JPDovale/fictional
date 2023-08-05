export interface CreateProps {
  userId: string;
  projectId: string;
}

export interface AddProps {
  userId: string;
  projectId: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  password: string | null;
  type: string;
  structure: string;
  created_at: Date;
  updated_at: Date;
  features: string;
  image_url: string | null;
  image_filename: string | null;
  user_id: string;
}
