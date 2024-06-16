exports.up = async function up(knex) {
  await knex.schema.alterTable('persons_attributes', (table) => {
    table.dateTime('trashed_at').defaultTo(null);
  });
};

exports.down = async function down(knex) {
  return knex.schema.alterTable('persons_attributes', (table) => {
    table.dropColumn('trashed_at');
  });
};
