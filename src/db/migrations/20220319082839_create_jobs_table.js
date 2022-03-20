/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable('jobs', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.integer('creator_id').notNullable();
    table.increments('count_id');
    table.string('compony_name');
    table.string('title');
    table.string('settlement');
    table.string('name');
    table.string('description', 1023);
    table.string('contact');
    table.boolean('is_moderated').defaultTo(false);
    table.timestamp('deleted_time');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('jobs');
