exports.up = async function up(knex) {
  await knex.schema.createTable('persons', (table) => {
    table
      .string('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.fn.uuid());
    table.integer('age').defaultTo(null);
    table.string('name').defaultTo(null);
    table.string('lastname').defaultTo(null);
    table.string('biographic').defaultTo(null);
    table.string('image_url').defaultTo(null);
    table.string('image_filename').defaultTo(null);
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    table.dateTime('updated_at').defaultTo(null);
    table.string('history').defaultTo(null);

    table.string('born_date').defaultTo(null);
    table.integer('born_date_day').defaultTo(null);
    table.integer('born_date_hour').defaultTo(null);
    table.integer('born_date_minute').defaultTo(null);
    table.integer('born_date_month').defaultTo(null);
    table.integer('born_date_second').defaultTo(null);
    table.integer('born_date_timestamp').defaultTo(null);
    table.integer('born_date_year').defaultTo(null);
    table.enum('born_date_time_christ', ['A.C.', 'D.C.', null]).defaultTo(null);
    table.string('death_date').defaultTo(null);

    table.integer('death_date_day').defaultTo(null);
    table.integer('death_date_hour').defaultTo(null);
    table.integer('death_date_minute').defaultTo(null);
    table.integer('death_date_month').defaultTo(null);
    table.integer('death_date_second').defaultTo(null);
    table.integer('death_date_timestamp').defaultTo(null);
    table.integer('death_date_year').defaultTo(null);
    table
      .enum('death_date_time_christ', ['A.C.', 'D.C.', null])
      .defaultTo(null);

    table.string('snowflake_structure_base_apprenticeship').defaultTo(null);
    table.string('snowflake_structure_base_function').defaultTo(null);
    table.string('snowflake_structure_base_objective').defaultTo(null);
    table.string('snowflake_structure_base_motivation').defaultTo(null);
    table.string('snowflake_structure_base_obstacle').defaultTo(null);
    table.string('snowflake_structure_base_pov_by_this_eye').defaultTo(null);

    table
      .string('user_id')
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE');
    table
      .string('project_id')
      .references('projects.id')
      .notNullable()
      .onDelete('CASCADE');
  });
};

exports.down = async function down(knex) {
  return knex.schema.dropTable('persons');
};
