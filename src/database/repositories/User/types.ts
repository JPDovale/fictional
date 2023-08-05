export interface UserFile {
  id: string;
  id_customer: string | null;
  name: string;
  username: string;
  email: string;
  email_verified: Date | null;
  avatar_url: string | null;
  avatar_filename: string | null;
  sex: string;
  age: number;
  admin: boolean;
  new_notifications: number;
  created_at: Date;
}
