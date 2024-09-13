import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('product_display', (table) => {
    table.increments('id').primary();
    table.decimal('revenuePercentage').notNullable();
    table.integer('displayOwner').unsigned();

    table.integer('productId').nullable().unsigned();
    table.integer('serviceId').nullable().unsigned();
    table.integer('vehicleId').nullable().unsigned();

    table.enum('entity', [
      'product', 'real_estate_property',
      'vehicle', 'service', 'travels'
    ]).defaultTo('product');


    table.datetime('expirationDate').nullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('deletedAt').nullable();


    table.foreign('displayOwner').references('id').inTable('users').onDelete('cascade');
    table.foreign('productId').references('id').inTable('products').onDelete('cascade');
    table.foreign('serviceId').references('id').inTable('services').onDelete('cascade');
    table.foreign('vehicleId').references('id').inTable('vehicles').onDelete('cascade');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('product_display');
}

