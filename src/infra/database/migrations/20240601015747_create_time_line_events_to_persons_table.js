exports.up = async function up(knex) {
  await knex.schema.createTable('time_line_events_to_person', (table) => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.fn.uuid())

    table
      .enum('type', [
        'BIRTH',
        'DEATH',
      ])
      .notNullable()

    table
      .string('event_id')
      .references('time_line_events.id')
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
  return knex.schema.dropTable('time_line_events_to_person')
}
