import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('files', function (table) {
    table.increments('id').primary();

    table.string('path', 220).notNullable();
    table.string('mimeType', 60).notNullable();
    table.enum('provider', ['local', 's3']).defaultTo('local');
    table.enum('status', ['active', 'inactive']).defaultTo('inactive');
    table.integer('userId').unsigned().nullable(); // * user id associated

    table.dateTime('createdAt').defaultTo(knex.raw('(CURRENT_TIMESTAMP())'));
    table.dateTime('updatedAt').nullable();
    table.dateTime('deletedAt').nullable();
  });

}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('files');
}

