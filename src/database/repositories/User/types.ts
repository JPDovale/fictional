export interface UserFile {
  id: string;
  name: string;
  username: string;
  email: string;
  email_verified_at: Date | null;
  avatar_url: string | null;
  avatar_filename: string | null;
  sex: string;
  age: number;
  admin: boolean;
  new_notifications: number;
  created_at: Date;
  updated_at: Date | null;
}
