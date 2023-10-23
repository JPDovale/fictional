import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.string('id').unique().notNullable().defaultTo(knex.fn.uuid());
    table.string('email').unique().notNullable().defaultTo('non-set');
    table.string('name').notNullable();
    table.boolean('admin').notNullable().defaultTo(false);
    table.integer('age').notNullable().defaultTo(0);
    table.string('avatar_url').defaultTo(null);
    table.string('avatar_filename').defaultTo(null);
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(null);
    table.dateTime('email_verified_at').defaultTo(null);
    table.string('id_costumer').unique().defaultTo(null);
    table.integer('new_notifications').notNullable().defaultTo(0);
    table.string('sex').notNullable().defaultTo('non-set');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
