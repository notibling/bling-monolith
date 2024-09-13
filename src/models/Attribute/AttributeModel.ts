import { QueryModel } from "@/common/Database";
import { Attribute, IRawAttribute } from ".";
import { QueryWhere } from "@/common/Database/Database.types";
import { knex } from "@/common/Knex";
import { MySQLUtils } from "@/utils";
import { IRawAttributeValue } from "./AttributeValue";

class AttributeModelClass extends QueryModel {
  static tableName: string = 'attribute_value_mapping';
  static jointKeyTableName: string = 'attributes';
  static jointValueTableName: string = 'attribute_values';

  protected override columns = {
    id: new QueryModel.Column('', 'attributes.id'),
    name: new QueryModel.Column('', 'attributes.name'),
    description: new QueryModel.Column('', 'attributes.description'),
    format: new QueryModel.Column('', 'attributes.format'),
    type: new QueryModel.Column('', 'attributes.type'),
  }

  constructor() {
    super(AttributeModelClass.tableName)
  }

  async fetch(...where: QueryWhere<IRawAttribute>[]): Promise<Attribute[]> {
    const select = this
      .knex()
      .select({
        ...this.columnsForSelect,
        values: knex.raw(`
          JSON_ARRAYAGG(JSON_OBJECT(
            'id', ${AttributeModelClass.jointValueTableName}.id,
            'value', ${AttributeModelClass.jointValueTableName}.value
          ))
        `),
      })
      .innerJoin(AttributeModelClass.jointKeyTableName, 'attribute_value_mapping.attributeId', `${AttributeModelClass.jointKeyTableName}.id`)
      .innerJoin(AttributeModelClass.jointValueTableName, 'attribute_value_mapping.attributeValueId', `${AttributeModelClass.jointValueTableName}.id`)
      .groupBy(`${AttributeModel.tableName}.attributeId`);

    const whereQuery = new QueryModel.WhereQuery<IRawAttribute>(select);

    const query = whereQuery.where(...where).run();

    console.log(query.toString());
    const attributes: IRawAttribute[] = await query;

    return attributes.map((_attribute) => new Attribute(_attribute))
  }

  async createAttribute(attribute: Partial<IRawAttribute> | Partial<IRawAttribute>[]) {
    const insertData = Array.isArray(attribute) ? attribute : [attribute];

    const created = await this.knex().insert(insertData).into(AttributeModelClass.jointKeyTableName);

    return MySQLUtils.returningIds(created[0], created.length);
  }

  async createAttributeValue(attributeValue: Partial<IRawAttributeValue> | Partial<IRawAttributeValue>[]) {
    const insertData = Array.isArray(attributeValue) ? attributeValue : [attributeValue];

    const created = await this.knex().insert(insertData).into(AttributeModelClass.jointValueTableName);

    return MySQLUtils.returningIds(created[0], created.length);
  }
}

const AttributeModel = new AttributeModelClass();
export { AttributeModel };