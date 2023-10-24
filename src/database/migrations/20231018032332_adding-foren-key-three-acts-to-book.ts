import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('books', (table) => {
    table
      .string('three_acts_structure_id')
      .references('three_acts_structures.id')
      .onDelete('CASCADE')
      .defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('books', (table) => {
    table.dropColumn('three_acts_structure_id');
  });
}
