import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('projects', (table) => {
    table.string('id').unique().notNullable().defaultTo(knex.fn.uuid());
    table.string('name').notNullable();
    table.string('image_url').defaultTo(null);
    table.string('image_filename').defaultTo(null);
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(null);
    table.string('password').defaultTo(null);
    table
      .enum('type', ['book', 'rpg', 'game-history', 'roadmap'])
      .notNullable()
      .defaultTo('book');
    table
      .enum('structure', ['snowflake', 'three-acts', 'hero-journey'])
      .notNullable()
      .defaultTo('three-acts');
    table
      .string('user_id')
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('projects');
}
