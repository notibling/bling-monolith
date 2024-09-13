import { ErrorHandler, ErrorMessages } from "@/common/Error";
import { HandlerDef } from "@/common/HttpHandler";
import { typeCast } from "@/common/typeCast";
import { ProductModel } from "@/models/Product";

const Handler: HandlerDef = async (req, res) => {
  try {
    const { page, pageSize } = req.query as Record<string, any>;
    const { products, total } =
      await ProductModel.fetchProducts({
        where: [],
        page: Number(page),
        pageSize: Number(pageSize)
      });

    return res.json({ success: true, products, total });
  } catch (error) {
    console.log(error)
    await ErrorHandler.getInstance()
      .throw(ErrorMessages.GENERIC('Fetch Products Inventory', JSON.stringify(error)));
    return res.json({ success: false, products: [] });
  }
}

export default Handler;