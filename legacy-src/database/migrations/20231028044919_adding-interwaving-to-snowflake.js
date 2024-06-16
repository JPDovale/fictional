/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function up(knex) {
  await knex.schema.alterTable('snowflake_structures', (table) => {
    table.string('interweaving_persons_and_expansion').defaultTo(null)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function down(knex) {
  await knex.schema.alterTable('snowflake_structures', (table) => {
    table.dropColumn('interweaving_persons_and_expansion')
  })
}
