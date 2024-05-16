exports.up = async function up(knex) {
  return knex.schema.alterTable('books', (table) => {
    table
      .string('snowflake_structure_id')
      .references('snowflake_structures.id')
      .onDelete('CASCADE')
      .defaultTo(null)
  })
}

exports.down = async function down(knex) {
  return knex.schema.alterTable('books', (table) => {
    table.dropColumn('snowflake_id')
  })
}
