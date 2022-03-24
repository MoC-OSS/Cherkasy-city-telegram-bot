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
    table.string('compony_name', 1023);
    table.string('settlement', 1023);
    table.string('name', 1023);
    table.string('description', 2047);
    table.string('salary', 1023);
    table.string('contact', 1023);
    table.boolean('is_moderated').defaultTo(false);
    table.integer('published_message_id');
    table.integer('preview_message_id');
    table.timestamp('deleted_time');
    table.timestamp('published_time');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('jobs');
