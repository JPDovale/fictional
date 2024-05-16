exports.up = async function up(knex) {
  await knex.schema.createTable('three_acts_structures', (table) => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.fn.uuid())
    table.string('act_1').defaultTo(null)
    table.string('act_2').defaultTo(null)
    table.string('act_3').defaultTo(null)
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
    table.dateTime('updated_at').defaultTo(null)
  })
}

exports.down = async function down(knex) {
  return knex.schema.dropTable('three_acts_structures')
}
