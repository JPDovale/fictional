exports.up = async function up(knex) {
  await knex.schema.alterTable('users', (table) => {
    table.string('auth_id').defaultTo(null)
    table.string('photo_url').defaultTo(null)
    table.boolean('verified').defaultTo(false)
    table.boolean('skip_login').defaultTo(false)
    table.string('access_token').defaultTo(null)
  })
}

exports.down = async function down(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('auth_id')
    table.dropColumn('photo_url')
    table.dropColumn('verified')
    table.dropColumn('skip_login')
    table.dropColumn('access_token')
  })
}
