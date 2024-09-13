import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('file_to_entity', (table) => {
    table.increments('id').primary();

    table.integer('fileId').unsigned();
    table.integer('entityId').unsigned();
    table.enum('entity', ['product', 'product_variant', 'user']);
    table.integer('userId').unsigned();

    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('deletedAt').nullable();


    table.foreign('fileId').references('id').inTable('files');
    table.foreign('userId').references('id').inTable('users');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('file_to_entity');
}

