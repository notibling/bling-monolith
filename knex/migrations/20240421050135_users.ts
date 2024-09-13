import { Knex } from "knex";

function up(knex: Knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('firstName');
    table.string('email').unique();
    table.string('password', 240);

    table.enum('type', ['client', 'business', 'admin']).nullable();
    table.enum('sex', ['male', 'female']).nullable();
    table.string('lastName').nullable();
    table.date('birth').nullable();
    table.string('country').nullable();
    table.string('residenceCountry').nullable();
    table.string('legalIdentification').nullable();
    table.string('profileImage').nullable();

    table.dateTime('createdAt').defaultTo(knex.raw('(CURRENT_TIMESTAMP())'));
    table.dateTime('updatedAt').nullable();
    table.dateTime('deletedAt').nullable();
  });
}

function down(knex: Knex) {
  return knex.schema.dropTableIfExists('users');
}

export { up, down };
