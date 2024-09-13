import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('entity_category', function (table) {
    table.increments('id').primary();
    table.dateTime('createdAt').defaultTo(knex.raw('(CURRENT_TIMESTAMP())'));
    table.dateTime('updatedAt').nullable();
    table.dateTime('deletedAt').nullable();
    // * RELATIONSHIPS
    table.enum('entity', [
      'product', 'real_estate_property',
      'vehicle', 'service', 'travels'
    ]).defaultTo('product');
    
    table.integer('entityId').unsigned();
    table.integer('categoryId').unsigned();

    table
      .foreign("categoryId")
      .references("products_categories.id")
      .onDelete('cascade')
      .onUpdate('cascade');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('entity_category');
}

