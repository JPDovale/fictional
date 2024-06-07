exports.up = async function up(knex) {
  await knex.schema.createTable('time_lines', (table) => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.fn.uuid());
    table.string('name').notNullable();

    table
      .string('project_id')
      .references('projects.id')
      .notNullable()
      .onDelete('CASCADE');

    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(null);
  });
};

exports.down = async function down(knex) {
  return knex.schema.dropTable('time_lines');
};
