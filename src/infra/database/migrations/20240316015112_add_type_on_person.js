exports.up = async function up(knex) {
  await knex.schema.alterTable('persons', (table) => {
    table
      .enum('type', [
        'PROTAGONIST',
        'ANTAGONIST',
        'SUPPORTING',
        'SECONDARY',
        'ADVERSARY',
        'MENTOR',
        'COMIC',
        'SYMBOLIC',
        'EXTRA',
      ])
      .notNullable()
      .defaultTo('EXTRA');
  });
};

exports.down = async function down(knex) {
  return knex.schema.alterTable('persons', (table) => {
    table.dropColumn('type');
  });
};
