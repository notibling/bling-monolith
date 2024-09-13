import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('categories', function (table) {
    table.increments('id').primary();
    table.string('name');
    table.string('description');
    table.integer('parentId').unsigned();

    table.dateTime('createdAt').defaultTo(knex.raw('(CURRENT_TIMESTAMP())'));
    table.dateTime('updatedAt').nullable();
    table.dateTime('deletedAt').nullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('categories');
}

