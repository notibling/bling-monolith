import { HandlerDef } from "@/common/HttpHandler";
import { AttributeModel, IRawAttribute } from "@/models/Attribute";
import { Where } from "@/common/Database/WhereQuery";
import { typeCast } from "@/common/typeCast";
import { ErrorHandler, ErrorMessages } from "@/common/Error";


interface IFetchAttributesPayload {
  type: string;
}

const Handler: HandlerDef = async (req, res) => {
  try {
    const { type } = typeCast<IFetchAttributesPayload>(req.query);
    
    const wheres: Where<IRawAttribute>[] = [];

    if (type)
      wheres.push(
        new Where<IRawAttribute>('type', 'raw', `JSON_CONTAINS(attributes.type, ?)`, [`"${type}"`])
      )

    const attributes =
      await AttributeModel.fetch(...wheres);

    return res.json({ success: true, attributes });
  } catch (error) {
    await ErrorHandler.getInstance()
    .throw(ErrorMessages.GENERIC('Fetch Attributes', JSON.stringify(error)));
      return res.json({ success: false, attributes: [] });
  }
}

export default Handler;