export function onUpdateTrigger(table: string) {
  return `
  CREATE TRIGGER ${table}_updated_at
  BEFORE UPDATE ON ${table}
  BEGIN
    UPDATE ${table} SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
  END;
  `;
}
