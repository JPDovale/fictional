exports.up = async function up(knex) {
  await knex.schema.createTable('foundations', (table) => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.fn.uuid());
    table.string('foundation').notNullable();
    table.string('what_happens').notNullable();
    table.string('why_happens').notNullable();
    table.string('where_happens').notNullable();
    table.string('who_happens').notNullable();
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(null);

    table
      .string('project_id')
      .references('projects.id')
      .notNullable()
      .onDelete('CASCADE');
  });
};

exports.down = async function down(knex) {
  return knex.schema.dropTable('foundations');
};
