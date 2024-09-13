import { ErrorHandler, ErrorMessages } from "@/common/Error";
import { HandlerDef } from "@/common/HttpHandler";
import { ProductDisplayObjectionModel } from "@/models/ProductDisplay/ProductDisplayObjectionModel";


const Handler: HandlerDef = async (req, res) => {
	try {


		const params = req.query as Record<string, any>;

		let page = Number(params.page);
		const owner = params.owner ? Number(params.owner) : null;

		const pageSize = Number(params.pageSize) || 10;

		if (page >= 1) page -= 1;

		if (Number.isNaN(Number(params.page))) ErrorHandler.getInstance()
			.throw(ErrorMessages.FETCH_MISSING_FILTERS('product_displays', ['page']))

		const query = ProductDisplayObjectionModel.query()
			.withGraphJoined({
				product: {
					images: {
						file: true
					},
					attributes: true,
					categories: {
						category: {
							parent: { $recursive: 2 },
							children: {
								$recursive: 2
							}
						},
					},
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
			.where('product_display.entity', 'product')
			.where('product_display.deletedAt', null)
		if (owner) query.where('product_display.displayOwner', owner);

		if (params.query) {
			query.where(function (builder) {
				builder.
					orWhereRaw(
						"product_display.entity = 'product' AND LOWER(product.title) LIKE ?",
						[`%${params.query?.toLowerCase()}%`]
					)
					.orWhereRaw(
						"product_display.entity = 'service' AND LOWER(service.title) LIKE ?",
						[`%${params.query?.toLowerCase()}%`]
					).orWhereRaw(
						"product_display.entity = 'vehicle' AND LOWER(vehicle.title) LIKE ?",
						[`%${params.query?.toLowerCase()}%`]
					)
			})
		}

		const { total } = await query
			.clone()
			.countDistinct('product_display.id', { as: 'total' }).first() as any

		const { results: productDisplays } = await query.page(page, pageSize);


		return res.json({ success: true, productDisplays, total,  });
	} catch (error) {
		console.log(error)
		await ErrorHandler.getInstance()
			.throw(ErrorMessages.GENERIC('Fetch Products Inventory', JSON.stringify(error)));
		return res.json({ success: false, products: [] });
	}
}

export default Handler;