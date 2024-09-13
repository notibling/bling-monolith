import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('cms_single_type', (table) => {
    table.increments('id').primary();

    table.string('key').notNullable();
    table.json('value').notNullable();

    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('deletedAt').nullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('cms_single_type');
}

