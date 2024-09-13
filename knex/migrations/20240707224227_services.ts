import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('services', function (table) {
    table.increments('id').primary();
    table.string('title');
    table.string('description');
    table.string('shortDescription');
    table.decimal('price', 10, 3);
   
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


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('services');

}

