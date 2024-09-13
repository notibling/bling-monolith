
import { ErrorHandler, ErrorMessages } from "@/common/Error";
import { HandlerDef } from "@/common/HttpHandler";
import { ICategory } from "@/models/Categories";
import { CategoryModel } from "@/models/Categories/CategoryModel";

interface IPayload extends Partial<ICategory> {

}

const Handler: HandlerDef = async (req, res) => {
  try {
    const { id, ...category } = req.body as IPayload;


    if (!id)
      throw ErrorHandler.getInstance()
        .throw(ErrorMessages.UPDATE_MISSING_FIELDS('category', ['id']));



    const updatedCategory = await CategoryModel.update(id, category);

    return res.json({ success: true, updatedCategory });
  } catch (error) {
    await ErrorHandler.getInstance()
      .throw(ErrorMessages.GENERIC('Update Category', JSON.stringify(error)));

    return res.json({ success: false, category: null });
  }
}

export default Handler;