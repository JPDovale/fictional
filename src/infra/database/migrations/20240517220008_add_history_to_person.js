exports.up = async function up(knex) {
  await knex.schema.alterTable('persons', (table) => {
    table
      .string('history')
      .defaultTo(null)
  })
}

exports.down = async function down(knex) {
  return knex.schema.alterTable('persons', (table) => {
    table.dropColumn('history')
  })
}
