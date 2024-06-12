exports.up = async function up(knex) {
  await knex.schema.alterTable('person_attribute_mutations', (table) => {
    table.dateTime('trashed_at').defaultTo(null);
  });
};

exports.down = async function down(knex) {
  return knex.schema.alterTable('person_attribute_mutations', (table) => {
    table.dropColumn('trashed_at');
  });
};
