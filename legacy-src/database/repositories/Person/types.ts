export interface PersonFile {
  id: string
  name: string | null
  lastname: string | null
  biographic: string | null
  age: number | null
  history: string | null
  image_url: string | null
  image_filename: string | null
  project_id: string
  book_id: string | null
  user_id: string
  created_at: Date
  updated_at: Date
  born_date: string | null
  born_date_timestamp: number | null
  born_date_year: number | null
  born_date_month: number | null
  born_date_day: number | null
  born_date_hour: number | null
  born_date_minute: number | null
  born_date_second: number | null
  born_date_time_christ: 'A.C.' | 'D.C.' | null
  death_date: string | null
  death_date_timestamp: number | null
  death_date_year: number | null
  death_date_month: number | null
  death_date_day: number | null
  death_date_hour: number | null
  death_date_minute: number | null
  death_date_second: number | null
  death_date_time_christ: 'A.C.' | 'D.C.' | null
  snowflake_structure_base_function: string | null
  snowflake_structure_base_objective: string | null
  snowflake_structure_base_motivation: string | null
  snowflake_structure_base_obstacle: string | null
  snowflake_structure_base_apprenticeship: string | null
  snowflake_structure_base_pov_by_this_eye: string | null
  snowflake_structure_expansion_function: string | null
  snowflake_structure_expansion_objective: string | null
  snowflake_structure_expansion_motivation: string | null
  snowflake_structure_expansion_obstacle: string | null
  snowflake_structure_expansion_apprenticeship: string | null
  snowflake_structure_expansion_pov_by_this_eye: string | null
}
