import { ErrorHandler, ErrorMessages } from "@/common/Error";
import { HandlerDef } from "@/common/HttpHandler";
import { ICategory } from "@/models/Categories";
import { CategoryModel } from "@/models/Categories/CategoryModel";
import { GeneralUtils } from "@/utils";

interface IPayload extends Partial<ICategory> {

}

const Handler: HandlerDef = async (req, res) => {
  try {
    const { name, description, parentId, } = req.body as IPayload;

    const [category] = await CategoryModel.create(
      {
        name, description, parentId,
      }
    );

    return res.json({ success: true, category });
  } catch (error) {
    await ErrorHandler.getInstance()
      .throw(ErrorMessages.GENERIC('Create Category', JSON.stringify(error)));
    return res.json({ success: false, category: null });
  }
}

export default Handler;