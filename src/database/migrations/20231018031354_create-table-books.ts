import { onUpdateTrigger } from '@database/utils/onUpdateTrigger';
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('books', (table) => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.fn.uuid());
    table.string('title').notNullable();
    table.string('subtitle').defaultTo(null);
    table.string('image_url').defaultTo(null);
    table.string('image_filename').defaultTo(null);
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(null);
    table.string('text').defaultTo(null);
    table
      .enum('structure', ['snowflake', 'three-acts', 'hero-journey'])
      .notNullable()
      .defaultTo('three-acts');
    table
      .string('user_id')
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE');
    table
      .string('project_id')
      .references('projects.id')
      .notNullable()
      .onDelete('CASCADE');
  });

  await knex.schema.raw(onUpdateTrigger('books'));
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('books');
}
