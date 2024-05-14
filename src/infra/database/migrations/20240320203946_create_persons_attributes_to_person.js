exports.up = async function up(knex) {
  await knex.schema.createTable('person_attribute_to_person', (table) => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.fn.uuid())

    table
      .string('attribute_id')
      .references('persons_attributes.id')
      .notNullable()
      .onDelete('CASCADE')

    table
      .string('person_id')
      .references('persons.id')
      .onDelete('CASCADE')
      .notNullable()
  })
}

exports.down = async function down(knex) {
  return knex.schema.dropTable('person_attribute_to_person')
}
