exports.up = async function up(knex) {
  await knex.schema.createTable('files', (table) => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.fn.uuid());
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(null);
    table.string('content').notNullable().defaultTo('');
    table.string('title').notNullable().defaultTo('Untitled');

    table
      .string('project_id')
      .references('projects.id')
      .notNullable()
      .onDelete('CASCADE');
  });
};

exports.down = async function down(knex) {
  return knex.schema.dropTable('files');
};
