
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('product_sales', function (table) {
    table.increments('id').primary();
    table.dateTime('createdAt').defaultTo(knex.raw('(CURRENT_TIMESTAMP())'));
    table.dateTime('updatedAt').nullable();
    table.dateTime('deletedAt').nullable();
    // * RELATIONSHIPS
    table.integer('productId').unsigned();
    table.integer('sellerId').unsigned();
    table.integer('buyerId').unsigned();
    table.integer('buyerShippingId').unsigned();
    table.integer('paymentId').unsigned();

    table
      .foreign("productId")
      .references("products.id")
      .onDelete('cascade')
      .onUpdate('cascade');

    table
      .foreign("sellerId")
      .references("users.id")
      .onDelete('cascade')
      .onUpdate('cascade');

    table
      .foreign("buyerId")
      .references("users.id")
      .onDelete('cascade')
      .onUpdate('cascade');

    table
      .foreign("buyerShippingId")
      .references("user_shipping.id")
      .onDelete('cascade')
      .onUpdate('cascade');

    table
      .foreign("paymentId")
      .references("payments.id")
      .onDelete('cascade')
      .onUpdate('cascade');

  });

}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('product_sales');
}

