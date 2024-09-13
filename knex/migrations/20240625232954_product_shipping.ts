import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('product_shipping', (table) => {
    table.increments('id').primary();
    table.integer('productId').unsigned().notNullable();
    table.string('value').notNullable();
    table.decimal('price').notNullable();

    table.datetime('createdAt').defaultTo(knex.fn.now());
    table.datetime('updatedAt').nullable();
    table.datetime('deletedAt').nullable();

    table.foreign('productId').references('id').inTable('products').onDelete('cascade');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('product_shipping');
}

