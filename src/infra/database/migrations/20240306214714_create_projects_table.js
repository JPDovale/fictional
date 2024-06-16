exports.up = async function up(knex) {
  await knex.schema.createTable('projects', (table) => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.fn.uuid());
    table.string('name').notNullable();
    table.enum('type', ['BOOK']).notNullable().defaultTo('BOOK');
    table
      .enum('structure_type', ['FICTIONAL_FLOW'])
      .notNullable()
      .defaultTo('FICTIONAL_FLOW');
    table.string('build_blocks').notNullable();
    table.string('image').defaultTo(null);
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(null);

    table
      .string('user_id')
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE');
  });
};

exports.down = async function down(knex) {
  return knex.schema.dropTable('projects');
};
