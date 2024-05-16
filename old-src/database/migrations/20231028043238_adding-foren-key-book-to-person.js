/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function up(knex) {
  await knex.schema.alterTable('persons', (table) => {
    table
      .string('book_id')
      .references('books.id')
      .onDelete('SET NULL')
      .defaultTo(null)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function down(knex) {
  await knex.schema.alterTable('persons', (table) => {
    table.dropColumn('book_id')
  })
}
