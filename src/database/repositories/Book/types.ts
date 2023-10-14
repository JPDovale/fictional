export interface CreatePropsBooksToProject {
  bookId: string;
  projectId: string;
}

export interface AddPropsBooksToProject {
  bookId: string;
  projectId: string;
}

export interface CreatePropsBooksToUser {
  bookId: string;
  userId: string;
}

export interface AddPropsBooksToUser {
  bookId: string;
  userId: string;
}

export interface BookFile {
  id: string;
  title: string;
  subtitle: string | null;
  structure: string;
  user_id: string;
  project_id: string;
  three_acts_structure_id: string | null;
  snowflake_structure_id: string | null;
  image_filename: string | null;
  image_url: string | null;
  created_at: Date;
  updated_at: Date;
  text: string | null;
}
