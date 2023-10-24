exports.up = async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.fn.uuid());
    table.string('name').notNullable();
    table.string('username').notNullable();
    table.string('email').unique().notNullable().defaultTo('non-set');
    table.dateTime('email_verified_at').defaultTo(null);
    table.string('avatar_url').defaultTo(null);
    table.string('avatar_filename').defaultTo(null);
    table.string('sex').notNullable().defaultTo('non-set');
    table.integer('age').notNullable().defaultTo(0);
    table.boolean('admin').notNullable().defaultTo(false);
    table.integer('new_notifications').notNullable().defaultTo(0);
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(null);
  });
};

exports.down = async function down(knex) {
  return knex.schema.dropTable('users');
};
