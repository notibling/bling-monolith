import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('attributes', function (table) {
      table.increments('id').primary();

      table.string('name');
      table.string('description');

      table.enum('format', ['string', 'number', 'boolean', 'json', 'json_array']).defaultTo('string');

      table.json('type').defaultTo([]);

    }).createTable('attribute_values', function (table) {
      table.increments('id').primary();
      table.text('value');

    }).createTable('attribute_value_mapping', function (table) {
      table.increments('id').primary();

      table.integer('attributeId').unsigned();
      table.integer('attributeValueId').unsigned();

      table.foreign('attributeId').references('id').inTable('attributes');
      table.foreign('attributeValueId').references('id').inTable('attribute_values');
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('attribute_value_mapping')
    .dropTableIfExists('attributes')
    .dropTableIfExists('attribute_values');
}

