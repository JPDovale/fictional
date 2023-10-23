import { onUpdateTrigger } from '@database/utils/onUpdateTrigger';
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('three_acts_structures', (table) => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.fn.uuid());
    table.string('act_1').defaultTo(null);
    table.string('act_2').defaultTo(null);
    table.string('act_3').defaultTo(null);
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(null);
  });

  await knex.schema.raw(onUpdateTrigger('three_acts_structures'));
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('three_acts_structures');
}
