import { ErrorHandler, ErrorMessages } from "@/common/Error";
import { HandlerDef } from "@/common/HttpHandler";
import { CategoryObjectionModel } from "@/models/Categories/CategoryObjectionModel";

const Handler: HandlerDef = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)

    const MAX_DEPTH = 3;


    const category = await CategoryObjectionModel
      .query()
      .withGraphFetched({
        parent: {
          children: {
            $recursive: MAX_DEPTH,
          }
        },
        children: { $recursive: MAX_DEPTH },
      })
      .where('id', id).first();

    return res.json({ success: true, category });
  } catch (error) {

    console.log(error);
    await ErrorHandler.getInstance()
      .throw(ErrorMessages.GENERIC('Get Category', JSON.stringify(error)));

    return res.json({ success: false, category: null });
  }
}

export default Handler;