exports.up = async function up(knex) {
  await knex.schema.createTable('persons_attributes', (table) => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.fn.uuid())
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
    table.dateTime('updated_at').defaultTo(null)
    table
      .enum('type', [
        'APPEARENCE',
        'DREAM',
        'OBJECTIVE',
        'PERSONALITY',
        'TRAUMA',
        'VALUE',
      ])
      .notNullable()

    table
      .string('file_id')
      .references('files.id')
      .notNullable()
      .onDelete('CASCADE')
  })
}

exports.down = async function down(knex) {
  return knex.schema.dropTable('persons_attributes')
}
