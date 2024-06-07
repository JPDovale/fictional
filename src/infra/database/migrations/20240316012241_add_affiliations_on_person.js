exports.up = async function up(knex) {
  await knex.schema.alterTable('persons', (table) => {
    table
      .string('affiliation_id')
      .references('person_affiliations.id')
      .defaultTo(null)
      .onDelete('CASCADE');
  });
};

exports.down = async function down(knex) {
  return knex.schema.alterTable('persons', (table) => {
    table.dropColumn('affiliation_id');
  });
};
