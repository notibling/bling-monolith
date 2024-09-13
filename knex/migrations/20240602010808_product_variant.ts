import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('product_variants', function (table) {
    table.increments('id').primary();

    table.double('price');
    table.double('priceBefore');
    table.integer('stock').nullable();
    table.string('skuSuffix').nullable();
    // * Main variant shown in search results & single page product.
    table.boolean('main').nullable();
    table.integer('productId').unsigned();

    table.dateTime('createdAt').defaultTo(knex.raw('(CURRENT_TIMESTAMP())'));
    table.dateTime('updatedAt').nullable()
    table.dateTime('deletedAt').nullable();

    table.foreign('productId').references('id').inTable('products');
  });

}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('product_variants');
}

