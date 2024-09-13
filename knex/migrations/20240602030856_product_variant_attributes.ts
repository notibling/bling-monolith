import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('product_variant_attributes', function (table) {
    table.increments('id').primary();
    
    table.integer('attributeId');
    table.string('attributeValue');

    table.integer('variantId').unsigned();

    table.dateTime('createdAt').defaultTo(knex.raw('(CURRENT_TIMESTAMP())'));
    table.dateTime('updatedAt').nullable();
    table.dateTime('deletedAt').nullable();

    table.foreign('variantId').references('id').inTable('product_variants');
  });

}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('product_variant_attributes');
}

