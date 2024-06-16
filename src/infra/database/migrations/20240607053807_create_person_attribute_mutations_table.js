exports.up = async function up(knex) {
  await knex.schema.createTable('person_attribute_mutations', (table) => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.fn.uuid());

    table
      .string('attribute_id')
      .references('persons_attributes.id')
      .notNullable()
      .onDelete('CASCADE');

    table
      .string('file_id')
      .references('files.id')
      .onDelete('CASCADE')
      .notNullable();

    table
      .string('event_id')
      .references('time_line_events.id')
      .onDelete('SET NULL')
      .defaultTo(null);

    table.integer('position').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(null);
  });
};

exports.down = async function down(knex) {
  return knex.schema.dropTable('person_attribute_mutations');
};
