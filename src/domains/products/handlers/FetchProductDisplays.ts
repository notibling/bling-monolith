import { Where } from "@/common/Database/WhereQuery";
import { ErrorHandler, ErrorMessages } from "@/common/Error";
import { HandlerDef } from "@/common/HttpHandler";
import { ProductDisplayModel } from "@/models/ProductDisplay/ProductDisplayModel";

const Handler: HandlerDef = async (req, res) => {
  try {
    const { page, pageSize, query } = req.query as Record<string, any>;

    const where = [];

    if (query) where.push(new Where('productJoined.title', 'like', `%${query}%`))

    const { productDisplays, total } =
      await ProductDisplayModel.fetchProducts({
        where,
        page: Number(page),
        pageSize: Number(pageSize)
      });

    return res.json({ success: true, productDisplays, total });
  } catch (error) {
    await ErrorHandler.getInstance()
    .throw(ErrorMessages.GENERIC('Fetch Products Displays', JSON.stringify(error)));
    return res.json({ success: false, products: [] });
  }
}

export default Handler;