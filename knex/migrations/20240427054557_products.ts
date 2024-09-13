import { Knex } from "knex";

import { ALLOWED_CURRENCIES } from "../constants";

function up(knex: Knex) {

  return knex.schema.createTable('products', function (table) {
    table.increments('id').primary();
    table.string('title');
    table.string('description');
    table.string('shortDescription');
    table.string('category');
    table.decimal('price', 10, 3).nullable();
    table.decimal('priceBefore', 10, 3).nullable();
    table.integer('stock').nullable();
    table.enum('currency', ALLOWED_CURRENCIES);
    table.string('sku'); // * Stock Keeping Unit 
    table.string('upc'); // * Universal Product Code
    table.boolean('hasShipping');
    table.double('shippingCost');
    table.string('pickupLocation');
    table.boolean('legalAge');
    table.json('sellingZone').nullable();
    table.boolean('hasRefund');
    table.enum("condition", ["new", "used", "refurbished"]);
    table.double('refundCost');
    table.boolean('deleted');
    table.enum('type', ['active', 'paused', 'on-revision']); // * change name to status

    table.json('paymentMethods').defaultTo('["cash"]');
    table.dateTime('createdAt').defaultTo(knex.raw('(CURRENT_TIMESTAMP())'));
    table.dateTime('updatedAt').nullable();
    table.dateTime('deletedAt').nullable();


    // * RELATIONSHIPS
    table.integer('userId').unsigned();
    table
      .foreign('userId')
      .references('users.id')
      .onDelete('restrict')
      .onUpdate('restrict');
  });
}

function down(knex: Knex) {
  return knex.schema.dropTableIfExists('products');
}


export { up, down };
