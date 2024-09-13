import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('product_attributes', (table) => {
    table.increments('id').primary();
    table.integer('productId').notNullable();
    table.integer('attributeId').nullable();
    table.string('attributeName').notNullable();
    table.string('attributeValue').notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('product_attributes');
}

