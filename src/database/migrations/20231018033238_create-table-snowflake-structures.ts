import { onUpdateTrigger } from '@database/utils/onUpdateTrigger';
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('snowflake_structures', (table) => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.fn.uuid());
    table.string('central_idia').defaultTo(null);
    table.string('expansion_to_page_paragraph_1').defaultTo(null);
    table.string('expansion_to_page_paragraph_2').defaultTo(null);
    table.string('expansion_to_page_paragraph_3').defaultTo(null);
    table.string('expansion_to_page_paragraph_4').defaultTo(null);
    table.string('expansion_to_page_paragraph_5').defaultTo(null);
    table.string('expansion_to_paragraph_phrase_1').defaultTo(null);
    table.string('expansion_to_paragraph_phrase_2').defaultTo(null);
    table.string('expansion_to_paragraph_phrase_3').defaultTo(null);
    table.string('expansion_to_paragraph_phrase_4').defaultTo(null);
    table.string('expansion_to_paragraph_phrase_5').defaultTo(null);
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(null);
  });

  await knex.schema.raw(onUpdateTrigger('snowflake_structures'));
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('snowflake_structures');
}
