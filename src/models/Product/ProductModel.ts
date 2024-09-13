import { QueryModel } from "@/common/Database";
import { QueryWhere } from "@/common/Database/Database.types";
import { Product, IRawProduct } from "./Product";
import { FetchProductsQueryOptions } from "./ProductModel.types";
import { knex } from "@/common/Knex";
import { ProductJoins } from "./ProductJoins";

class ProductModelClass extends QueryModel {
  static tableName: string = 'products';

  protected override columns = {
    id: new QueryModel.Column('id'),
    title: new QueryModel.Column('title'),
    description: new QueryModel.Column('description'),
    shortDescription: new QueryModel.Column('shortDescription'),
    category: new QueryModel.Column('category'),
    price: new QueryModel.Column('price'),
    sku: new QueryModel.Column('sku'),
    upc: new QueryModel.Column('upc'),
    hasShipping: new QueryModel.Column('hasShipping'),
    shippingCost: new QueryModel.Column('shippingCost'),
    pickupLocation: new QueryModel.Column('pickupLocation'),
    legalAge: new QueryModel.Column('legalAge'),
    hasRefund: new QueryModel.Column('hasRefund'),
    refundCost: new QueryModel.Column('refundCost'),
    images: new QueryModel.Column('images'),
    userId: new QueryModel.Column('userId'),
    condition: new QueryModel.Column('condition'),
    sellingZone: new QueryModel.Column('sellingZone'),
    paymentMethods: new QueryModel.Column('paymentMethods'),
  }

  constructor() {
    super(ProductModelClass.tableName)
  }



  async findProductBy(...where: QueryWhere<IRawProduct>[]): Promise<Product | undefined> {
    let query = ProductJoins.variantsJoin(this.knex().select({
      ...this.columnsForSelect,
      variants: 'product_variants.variants'
    }));

    query = new QueryModel.WhereQuery<IRawProduct>(query).where(...where).run();

    const product: IRawProduct = await query.first();
    if (product) return new Product(product)

    return;
  }

  async fetchProducts({ where, pageSize = 20, page = 0 }: FetchProductsQueryOptions): Promise<{
    products: Product[];
    total: number;
    totalPages: number;
  }> {
    const query = ProductJoins.joinImages(
      ProductJoins.variantsJoin(
        this.knex().select({
          ...this.columnsForSelect,
          variants: knex.raw('JSON_ARRAYAGG(product_variants.variants)'),
          images: knex.raw('productImages.images'),
        }))
    );
    console.log(query.toString())
    
    // * With grouping
    const whereQuery = new QueryModel.WhereQuery<IRawProduct>(query.clone().groupBy('products.id')).where(...where).run();
    // * Without grouping
    const countQueryRaw = new QueryModel.WhereQuery<IRawProduct>(query).where(...where).run();

    const pagination = new QueryModel.PaginateQuery(whereQuery).pageSize(pageSize).page(page);

    const countQuery = countQueryRaw.clone().select().countDistinct('products.id', { as: 'total' });

    const rawProducts: IRawProduct[] = await pagination.run();

    const { total } = await countQuery.first();

    const products = rawProducts.map((product) => new Product(product));

    return { products, total, totalPages: Math.ceil(total / pageSize) };
  }


  create(product: any) {
    return this.knex().insert(product);
  }

  update(productId: string, product: Partial<IRawProduct>) {
    return this.knex().update(product).where('id', '=', productId);
  }
}

const ProductModel = new ProductModelClass();
export { ProductModel };