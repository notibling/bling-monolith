interface IRawAttributeValue {
  id: number;
  value: string;
}

class AttributeValue {
  public id: number;
  public value: string;

  constructor(attributeValue: IRawAttributeValue) {
    this.id = attributeValue.id;
    this.value = attributeValue.value;
  }

  toJSON() {
    return {
      id: this.id,
      value: this.value
    }
  }
}


export { AttributeValue, IRawAttributeValue }