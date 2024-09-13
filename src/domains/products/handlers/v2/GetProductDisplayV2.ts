import { ErrorHandler, ErrorMessages } from "@/common/Error";
import { HandlerDef } from "@/common/HttpHandler";
import { ProductDisplayObjectionModel } from "@/models/ProductDisplay/ProductDisplayObjectionModel";


const Handler: HandlerDef = async (req, res) => {
  try {
    const { id } = req.params;

    if (Number.isNaN(Number(id))) ErrorHandler.getInstance()
      .throw(ErrorMessages.FIND_MISSING_FILTERS('product_display', ['id']))

    const productDisplay = await ProductDisplayObjectionModel.query()
      .withGraphJoined({
        product: {
          images: {
            file: true
          },
          categories: {
            category: {
              parent: { $recursive: 2 },
              children: {
                $recursive: 2
              }
            },
          },
          attributes: true,
          variants: {
            variantAttributes: {
              attribute: {
                values: true
              }
            }
          }
        },
        service: {

        },
        vehicle: {

        }
      })
      .where('product_display.id', id)
      .where('product_display.entity', 'product')
      .where('product_display.deletedAt', null)

      .first();


    return res.json({ success: true, productDisplay });
  } catch (error) {
    console.log(error)
    await ErrorHandler.getInstance()
      .throw(ErrorMessages.GENERIC('Find Product Display', JSON.stringify(error)));
    return res.json({ success: false, products: [] });
  }
}

export default Handler;