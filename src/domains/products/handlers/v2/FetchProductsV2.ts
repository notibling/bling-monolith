import { ErrorHandler, ErrorMessages } from "@/common/Error";
import { HandlerDef } from "@/common/HttpHandler";
import { ProductObjectionModel } from "@/models/Product/ProductObjectionModel";

const Handler: HandlerDef = async (req: Express.Request, res) => {
  try {

    const params = req.query as Record<string, any>;
    let page = Number(params.page);
    const pageSize = Number(params.pageSize) || 10;

    if (page >= 1) page -= 1;

    if (Number.isNaN(Number(params.page)))
      ErrorHandler.getInstance()
        .throw(ErrorMessages.FETCH_MISSING_FILTERS('products', ['page']))

    const { total } = await ProductObjectionModel.query().page(page, pageSize);

    const queryProducts = await ProductObjectionModel.query().withGraphJoined({
      variants: {
        variantAttributes: {
          attribute: true,
        },
        images: true
      },
      images: {
        file: true
      }
    });

    const products = queryProducts.map((product) => product.toJSON());

    return res.json({ success: true, products, total });
  } catch (error: any) {
    console.log(error)
    await ErrorHandler.getInstance()
      .throwRequestError(req, ErrorMessages.GENERIC('Fetch Products Inventory'), error.stack);
    return res.json({ success: false, products: [] });
  }
}

export default Handler;