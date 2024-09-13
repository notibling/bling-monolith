import { ErrorHandler, ErrorMessages } from "@/common/Error";
import { HandlerDef } from "@/common/HttpHandler";
import { CategoryModel } from "@/models/Categories/CategoryModel";
import { GeneralUtils } from "@/utils";

interface IPayload {
  nested?: string;
}

const Handler: HandlerDef = async (req, res) => {
  try {
    const { nested: rawNested = '' } = req.query as IPayload;

    const nested = GeneralUtils.toObject<boolean>(rawNested);

    const categories = await CategoryModel.fetch(Boolean(nested));

    return res.json({ success: true, categories });
  } catch (error) {
    await ErrorHandler.getInstance()
      .throw(ErrorMessages.GENERIC('Fetch Categories', JSON.stringify(error)));
      
    return res.json({ success: false, categories: [] });
  }
}

export default Handler;