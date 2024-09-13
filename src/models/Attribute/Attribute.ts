import { PlainObject } from "@/common/PlainObject";
import { GeneralUtils } from "@/utils";
import { AttributeValue, IRawAttributeValue } from "./AttributeValue";

interface IRawAttribute {
  id: number;
  name: string;
  description: string;
  format: 'string' | 'number' | 'boolean' | 'json' | 'json_array';
  type: string[] | null;

  values: IRawAttributeValue[] | null;
}


class Attribute {

  public id: number;
  public name: string;
  public description: string;
  public format: 'string' | 'number' | 'boolean' | 'json' | 'json_array';
  public type: string[] | null;

  public values: AttributeValue[] | null;

  constructor(attribute: IRawAttribute) {
    this.id = attribute.id;
    this.name = attribute.name;
    this.description = attribute.description;
    this.format = attribute.format;
    this.type = attribute.type ?? null;
    this.values =
      attribute.values ?
        attribute.values.map((attributeValue) => new AttributeValue(attributeValue))
        : null;
  }


  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      format: this.format,
      type: this.type,
      values: this.values
    }
  }
}

export { Attribute, IRawAttribute };