exports.up = async function up(knex) {
  await knex.schema.alterTable('time_line_events_to_person', (table) => {
    table.dateTime('created_at').defaultTo(null);
    table.dateTime('updated_at').defaultTo(null);
    table.dateTime('trashed_at').defaultTo(null);
  });
};

exports.down = async function down(knex) {
  return knex.schema.alterTable('time_line_events_to_person', (table) => {
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
    table.dropColumn('trashed_at');
  });
};
