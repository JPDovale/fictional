exports.up = async function up(knex) {
  await knex.schema.createTable('persons', (table) => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.fn.uuid())
    table.string('name').defaultTo(null)
    table.string('image').defaultTo(null)
    table.string('birth_date').defaultTo(null) // DD:MM:YYYY:T:HH:MM:SS
    table.string('death_date').defaultTo(null)
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
    table.dateTime('updated_at').defaultTo(null)

    table
      .string('project_id')
      .references('projects.id')
      .notNullable()
      .onDelete('CASCADE')
  })
}

exports.down = async function down(knex) {
  return knex.schema.dropTable('persons')
}
