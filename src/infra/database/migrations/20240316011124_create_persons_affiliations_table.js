exports.up = async function up(knex) {
  await knex.schema.createTable('person_affiliations', (table) => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.fn.uuid());
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(null);

    table
      .string('father_id')
      .references('persons.id')
      .defaultTo(null)
      .onDelete('CASCADE');
    table
      .string('mother_id')
      .references('persons.id')
      .defaultTo(null)
      .onDelete('CASCADE');
  });
};

exports.down = async function down(knex) {
  return knex.schema.dropTable('person_affiliations');
};
