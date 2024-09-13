import { ErrorHandler, ErrorMessages } from "@/common/Error";
import { HandlerDef } from "@/common/HttpHandler";
import { AttributeModel, IRawAttribute } from "@/models/Attribute";
import { IRawAttributeValue } from "@/models/Attribute/AttributeValue";

interface IPayload {
  attribute: Partial<IRawAttribute>;
  values: Partial<IRawAttributeValue>[];
}

const Handler: HandlerDef = async (req, res) => {
  try {
    const { attribute, values } = req.body as IPayload;

    const [createdAttribute] = await AttributeModel.createAttribute(
      {
        name: attribute.name,
        type: attribute.type,
        description: attribute.description,
        format: attribute.format,
      }
    );

    const createdValues = await AttributeModel.createAttributeValue(
      values.map((value) => ({
        attributeId: createdAttribute,
        value: value.value
      }))
    );

    return res.json({
      success: true,
      createdAttribute,
      createdValues
    });
  } catch (error) {
    await ErrorHandler.getInstance()
      .throw(ErrorMessages.GENERIC('Create Attribute', JSON.stringify(error)));
    
      return res.json({
      success: false,
      createdAttribute: null,
      createdValues: null,
    });
  }
}

export default Handler;