exports.up = async function up(knex) {
  await knex.schema.alterTable('person_attribute_mutations', (table) => {
    table.string('title').defaultTo(null);
  });
};

exports.down = async function down(knex) {
  return knex.schema.alterTable('person_attribute_mutations', (table) => {
    table.dropColumn('title');
  });
};
