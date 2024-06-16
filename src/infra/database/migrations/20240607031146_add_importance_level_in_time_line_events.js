exports.up = async function up(knex) {
  await knex.schema.alterTable('time_line_events', (table) => {
    table.integer('importance_level').notNullable().defaultTo(1);
  });

  await knex('time_line_events').update({ importance_level: 1 });
};

exports.down = async function down(knex) {
  return knex.schema.alterTable('time_line_events', (table) => {
    table.dropColumn('importance_level');
  });
};
