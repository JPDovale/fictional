exports.up = async function up(knex) {
  await knex.schema.alterTable('persons_attributes', (table) => {
    table
      .enum('type_temp', [
        'APPEARENCE',
        'DREAM',
        'OBJECTIVE',
        'PERSONALITY',
        'TRAUMA',
        'VALUE',
        'HOBBY',
        'FEAR',
        'MOTIVATION',
        'ADDICTION',
        'DESIRE',
        'HABIT',
      ])
      .notNullable()
      .defaultTo('APPEARENCE');
  });

  await knex.raw(`
    UPDATE persons_attributes
    SET type_temp = type
  `);

  await knex.schema.alterTable('persons_attributes', (table) => {
    table.dropColumn('type');
    table.renameColumn('type_temp', 'type');
  });
};

exports.down = async function down(knex) {
  await knex.schema.alterTable('persons_attributes', (table) => {
    table
      .enum('type_temp', [
        'APPEARENCE',
        'DREAM',
        'OBJECTIVE',
        'PERSONALITY',
        'TRAUMA',
        'VALUE',
      ])
      .notNullable()
      .defaultTo('APPEARENCE');
  });

  await knex.raw(`
    UPDATE persons_attributes
    SET type_temp = type
    WHERE type IN ('APPEARENCE', 'DREAM', 'OBJECTIVE', 'PERSONALITY', 'TRAUMA', 'VALUE')
  `);

  return knex.schema.alterTable('persons_attributes', (table) => {
    table.dropColumn('type');
    table.renameColumn('type_temp', 'type');
  });
};
