import  { Model } from 'objection';
import { objectionKnex } from '@/common/KnexObjection';


import { IRawProduct } from '../Product/Product';
import { IService } from '../Service/Service';
import { IVehicle } from '../Vehicle/Vehicle';


class ProductDisplayObjectionModel extends Model {
  id!: number;
  productId!: number;
  displayOwner!: number;
  revenuePercentage!: number;

  expirationDate!: string;
  createdAt!: string;
  updatedAt!: string;
  deletedAt!: string;
  entity!: 'product' | 'service' | 'vehicle';
  product?: IRawProduct;
  service?: IService;
  vehicle?: IVehicle;

  static get tableName() {
    return 'product_display';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        displayOwner: { type: 'integer' },
        revenuePercentage: { type: 'integer' },
        expirationDate: { type: 'string' },
        entity: { type: 'string' },

        productId: { type: 'integer' },
        serviceId: { type: 'integer' },
        vehicleId: { type: 'integer' },

        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        deletedAt: { type: 'string' },
      }
    };
  }

  static get relationMappings() {
    const { ProductObjectionModel } = require('../Product/ProductObjectionModel');
    const { ServiceObjectionModel } = require('../Service/ServiceObjectionModel');
    const { VehicleObjectionModel } = require('../Vehicle/VehicleObjectionModel');
    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductObjectionModel,
        join: {
          from: 'product_display.productId',
          to: 'products.id',
        },
      },
      service: {
        relation: Model.BelongsToOneRelation,
        modelClass: ServiceObjectionModel,
        join: {
          from: 'product_display.serviceId',
          to: 'services.id',
          extra: ['entity']
        },
      },
      vehicle: {
        relation: Model.BelongsToOneRelation,
        modelClass: VehicleObjectionModel,
        join: {
          from: 'product_display.vehicleId',
          to: 'vehicles.id',
        },
      }
    }
  }
  // static get modifiers() {
  //   return {
  //     product(builder: Objection.QueryBuilder<any>) {
  //       builder.select('products.*').where('entity', 'product');
  //     },
  //     service(builder: Objection.QueryBuilder<any>) {
  //       builder.select('services.*').where('entity', 'service');
  //     },
  //     // vehicle(builder: Objection.QueryBuilder<any>) {
  //     //   builder.select('vehicles.*').where('item_type', 'vehicle');
  //     // }
  //   }
  // }
}

ProductDisplayObjectionModel.knex(objectionKnex);

export { ProductDisplayObjectionModel }