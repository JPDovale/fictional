import { BookStructureType } from '@modules/Books/models/Book';

export interface BookFile {
  id: string;
  title: string;
  subtitle: string | null;
  structure: BookStructureType;
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
