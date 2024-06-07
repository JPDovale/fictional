exports.up = async function up(knex) {
  await knex.schema.alterTable('persons', (table) => {
    table.dropColumn('birth_date');
    table.dropColumn('death_date');
  });
};

exports.down = async function down(knex) {
  return knex.schema.alterTable('persons', (table) => {
    table.string('birth_date').defaultTo(null);
    table.string('death_date').defaultTo(null);
  });
};
