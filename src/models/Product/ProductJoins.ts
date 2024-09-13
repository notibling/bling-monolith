import { Knex } from "knex";

import { knex } from "@/common/Knex";

import { ProductVariantAttributeModel, ProductVariantModel } from "../ProductVariant";
import { AttributeModel } from "../Attribute";
import { FileModel } from "../File/FileModel";

class ProductJoins {

  static variantsJoin(queryBuilder: Knex.QueryBuilder) {
    return queryBuilder.leftJoin(
      knex
        .select({
          ...ProductVariantModel.columnsForSelect,
          variants: knex.raw(`
            JSON_OBJECT(${ProductVariantModel.fields()},
             'variantAttributes', 
             (${knex.select(
            knex.raw(`JSON_ARRAYAGG(JSON_OBJECT(${ProductVariantAttributeModel.fields()}, 'attribute', JSON_OBJECT(${AttributeModel.fields()}) ))`))
              .from('product_variant_attributes')

              .innerJoin('attributes', 'attributes.id', 'product_variant_attributes.attributeId')
              .whereRaw('product_variant_attributes.variantId = product_variants.id')
              .groupBy('product_variant_attributes.variantId')
              .toString()})
            )`)
        })
        .from('product_variants')
        .groupBy('product_variants.id')
        .as('product_variants')
      , 'product_variants.productId', 'products.id')
  }

  static joinImages(queryBuilder: Knex.QueryBuilder) {
    return queryBuilder.leftJoin(
      knex.raw(
        `(SELECT p.id as productId, JSON_ARRAYAGG(JSON_OBJECT(${FileModel.fields({ tableName: 'f' })})) as images
          FROM products p
          JOIN JSON_TABLE(p.images, '$[*]' COLUMNS (file_id INT PATH '$')) AS jt
              JOIN files f ON jt.file_id = f.id

          where f.id is not null
          group by  p.id
      ) as productImages`)
      , 'productImages.productId', 'products.id'
    );
  }

  static categoriesJoin(queryBuilder: Knex.QueryBuilder) {
    return queryBuilder.leftJoin(
      knex.withRecursive('categories', (qb) => {
        qb.select('*')
          .from('product_category')
          .where('product_category.productId', '=', 'products.id')
          .union((qb) => {
            qb.select('*')
              .from('product_categories')
              .join('ancestors', 'ancestors.parentId', 'people.id');
          });
      })
        .select('*')
        .from('categories')
      , 'product_category.productId', 'products.id')
  }
}

export { ProductJoins }