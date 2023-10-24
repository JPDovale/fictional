import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('books', (table) => {
    table
      .string('snowflake_structure_id')
      .references('snowflake_structures.id')
      .onDelete('CASCADE')
      .defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('books', (table) => {
    table.dropColumn('snowflake_id');
  });
}
