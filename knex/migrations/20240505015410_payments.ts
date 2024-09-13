import type { Knex } from "knex";
import { ALLOWED_CURRENCIES, PAYMENT_STATUS } from "../constants";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('payments', function (table) {
    table.increments('id').primary();

    table.decimal('amount', 10, 3);
    table.decimal('discount', 10, 3).defaultTo(0.0);
    table.enum('status', PAYMENT_STATUS).defaultTo('waiting_payment');
    table.enum('currency', ALLOWED_CURRENCIES);

    table.dateTime('createdAt').defaultTo(knex.raw('(CURRENT_TIMESTAMP())'));
    table.dateTime('updatedAt').nullable();
    table.dateTime('deletedAt').nullable();
  });

}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('payments');
}

