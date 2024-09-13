import { Knex } from "knex";

function up(knex: Knex) {
  return knex.schema.createTable('user_shipping', function (table) {
    table.increments('id').primary();
    table.string('description');
    table.string('country');
    table.string('province');
    table.string('city');
    table.string('postalCode');
    table.string('street1');
    table.string('street2');
    table.string('streetCorner');
    table.string('solar');
    table.string('doorNumber');
    table.string('apartmentNumber');
    table.dateTime('createdAt').defaultTo(knex.raw('(CURRENT_TIMESTAMP())'));
    table.dateTime('updatedAt').nullable();
    table.dateTime('deletedAt').nullable();
    // * RELATIONSHIPS
    table.integer('userId').unsigned();
    table
      .foreign("userId")
      .references("users.id")
      .onDelete('cascade')
      .onUpdate('cascade');
  });
}

function down(knex: Knex) {
  return knex.schema.dropTableIfExists('user_shipping');
}


export { up, down };
