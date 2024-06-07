exports.up = async function up(knex) {
  await knex.schema.alterTable('time_line_events', (table) => {
    table.dateTime('trashed_at').defaultTo(null);
  });
};

exports.down = async function down(knex) {
  return knex.schema.alterTable('time_line_events', (table) => {
    table.dropColumn('trashed_at');
  });
};
