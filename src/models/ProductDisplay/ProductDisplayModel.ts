import { QueryModel } from "@/common/Database";
import { MySQLUtils } from "@/utils";

import { IRawProductDisplay, ProductDisplay } from "./ProductDisplay";
import { FetchProductDisplaysQueryOptions } from "./ProductDisplayModel.types";
import { ProductJoins } from "../Product/ProductJoins";
import { ProductModel } from "../Product/ProductModel";
import { knex } from "@/common/Knex";
import { ProductShippingModel } from "../ProductShipping";
import { FileModel } from "../File/FileModel";

class ProductDisplayModelClass extends QueryModel {
  static tableName = 'product_display';

  protected override columns = {
    id: new QueryModel.Column('id'),
    productId: new QueryModel.Column('productId'),
    displayOwner: new QueryModel.Column('displayOwner'),
    revenuePercentage: new QueryModel.Column('revenuePercentage'),
    expirationDate: new QueryModel.Column('expirationDate'),
    
    createdAt: new QueryModel.Column('createdAt'),
    updatedAt: new QueryModel.Column('updatedAt'),
    deletedAt: new QueryModel.Column('deletedAt'),
  }

  constructor() {
    super(ProductDisplayModelClass.tableName);
  }

  async create(productDisplay: Partial<IRawProductDisplay> | Partial<IRawProductDisplay>[]) {
    const insertData = Array.isArray(productDisplay) ? productDisplay : [productDisplay];
    const [firstId] = await this.knex().insert(insertData).into(ProductDisplayModelClass.tableName);

    return MySQLUtils.returningIds(firstId, insertData.length);
  }


  async fetchProducts({ where, pageSize = 20, page = 0 }: FetchProductDisplaysQueryOptions): Promise<{
    productDisplays: ProductDisplay[];
    total: number;
    totalPages: number;
  }> {
    const query = this.knex().select({
      ...this.columnsForSelect,
      product: knex.raw(`JSON_OBJECT(${ProductModel.fields({ tableName: 'productJoined' })}, 'variants', productJoined.variants, 'shipping', productJoined.shipping)`),
    })
      .innerJoin(
        ProductJoins.variantsJoin(
          this.knex('products').select({
            ...ProductModel.columnsForSelect,
            variants: knex.raw('product_variants.variants'),
            shipping: knex.raw(`productShipping.shipping`),
            images: knex.raw(`JSON_ARRAYAGG(productImages.images)`),
          })
            .leftJoin(
              this.knex(FileModel.tableName).select({
                id: 'files.id',
                images: knex.raw(`JSON_OBJECT(${FileModel.fields()})`),
              })
                .as('productImages')
              , knex.raw(`FIND_IN_SET(productImages.id,  REPLACE(REPLACE(REPLACE(products.images, '[', ''), ']', ''), ' ', '')) > 0`)
            )
            .leftJoin(
              this.knex(ProductShippingModel.tableName).select({
                shipping: knex.raw(`JSON_ARRAYAGG(JSON_OBJECT(${ProductShippingModel.fields()}))`),
                productId: 'product_shipping.productId',
              })
                .groupBy(`${ProductShippingModel.tableName}.productId`).as('productShipping')
              , 'products.id', `productShipping.productId`)
            .groupBy('products.id')
        ).as('productJoined')
        , 'productJoined.id', 'product_display.productId');

    const whereQuery = new QueryModel.WhereQuery<IRawProductDisplay>(query).where(...where).run();

    const pagination = new QueryModel.PaginateQuery(whereQuery).pageSize(pageSize).page(page);

    const countQuery = whereQuery.clone().select().count(`${ProductDisplayModelClass.tableName}.id`, { as: 'total' });


    const rawProducts: IRawProductDisplay[] = await pagination.run();

    const { total } = await countQuery.first();

    const productDisplays = rawProducts.map((productDisplay) => new ProductDisplay(productDisplay));

    return { productDisplays, total, totalPages: Math.ceil(total / pageSize) };
  }


}
const ProductDisplayModel = new ProductDisplayModelClass();

export { ProductDisplayModel }