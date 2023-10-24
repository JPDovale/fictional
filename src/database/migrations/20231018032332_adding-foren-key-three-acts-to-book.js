exports.up = async function up(knex) {
  return knex.schema.alterTable('books', (table) => {
    table
      .string('three_acts_structure_id')
      .references('three_acts_structures.id')
      .onDelete('CASCADE')
      .defaultTo(null);
  });
};

exports.down = async function down(knex) {
  return knex.schema.alterTable('books', (table) => {
    table.dropColumn('three_acts_structure_id');
  });
};
