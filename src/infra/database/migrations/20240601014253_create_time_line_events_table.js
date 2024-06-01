exports.up = async function up(knex) {
  await knex.schema.createTable('time_line_events', (table) => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.fn.uuid())
    table.string('date').notNullable()
    table.string('event').notNullable()

    table
      .string('time_line_id')
      .references('time_lines.id')
      .notNullable()
      .onDelete('CASCADE')

    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
    table.dateTime('updated_at').defaultTo(null)
  })
}

exports.down = async function down(knex) {
  return knex.schema.dropTable('time_line_events')
}
