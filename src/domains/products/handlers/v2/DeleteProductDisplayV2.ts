import { ErrorHandler, ErrorMessages } from "@/common/Error";
import { HandlerDef } from "@/common/HttpHandler";
import { typeCast } from "@/common/typeCast";
import { ProductDisplayObjectionModel } from "@/models/ProductDisplay/ProductDisplayObjectionModel";


const Handler: HandlerDef = async (req, res) => {
  try {
    const params = typeCast<{ displayId: number }>(req.params)

    const productDisplay = await ProductDisplayObjectionModel.query().findById(params.displayId);

    if (!productDisplay) return res.json({ success: false, message: ErrorMessages.NOT_FOUND_ENTITY('Product Display')[1] })
    if (productDisplay.displayOwner !== req.user.id) return res.json({ success: false, message: ErrorMessages.NOT_AUTHORIZED('Product Display')[1] });

    const newDisplay = await ProductDisplayObjectionModel.query().patchAndFetchById(productDisplay.id, {
      deletedAt: new Date().toISOString()
    });

    return res.json({ success: true, productDisplay: newDisplay });
  } catch (error) {
    console.log(error)
    await ErrorHandler.getInstance()
      .throw(ErrorMessages.GENERIC('Fetch Products Inventory', JSON.stringify(error)));
    return res.json({ success: false, products: [] });
  }
}

export default Handler;