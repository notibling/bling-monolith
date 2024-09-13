
import { HandlerDef } from "@/common/HttpHandler";
import { IRawProductVariant } from "@/models/ProductVariant";
import { IFile } from '@/models/File';
import { IProductAttribute } from '@/models/ProductAttribute/ProductAttribute';
import { CreateProductBusiness } from '../business/CreateProductBusiness';
import { ErrorHandler, ErrorMessages } from "@/common/Error";


interface ICreateProductPayload {
  type?: 'product' | 'service' | 'vehicle' | 'property';

  title?: string;
  images: IFile[];
  sku?: string;
  upc?: string;
  description?: string;
  sellingZone: string[];
  shippingCost: number | null;
  hasShipping: boolean;
  pickupLocation: string;
  paymentMethods: string[];
  categories: number[];
  condition: 'new' | 'used' | 'refurbished' | null;

  variants: Partial<Omit<IRawProductVariant, 'images'> & { images: IFile[] }>[];
  attributes: Partial<IProductAttribute>[];
}


const Handler: HandlerDef = async (req, res) => {
  try {
    const payload = req.body as ICreateProductPayload;
    const createProductBusiness = new CreateProductBusiness();

    const { id: userId } = req.user;

    // * create product
    const { variants: _variants, attributes: _attributes, categories, ..._product } = payload;
    const images = payload.images?.map((image) => image.id)

    const [product] = await createProductBusiness.createProduct(userId, { ..._product, images, condition: _product.condition ?? 'new' });

    const [productDisplay] = await createProductBusiness.createProductDisplay(userId, product)

    const productCategories = await createProductBusiness.createProductCategories(product, categories);

    const attributes = await createProductBusiness.createAttributes(product, _attributes.map((attr) => ({
      attributeId: attr.attributeId,
      attributeName: attr.attributeName,
      attributeValue: attr.attributeValue,
    })));

    const storedVariants = await createProductBusiness.createVariants(product,
      _variants.map(({ images, variantAttributes, id: _id, ...variant }) => ({
        ...variant,
        images: images?.map((image) => image.id)
      }))
    )
    console.log(storedVariants)


    const variantAttributes = await createProductBusiness.createVariantsAttributes(storedVariants, _variants.map(({ images, ...variant }) => ({
      images: images?.map((image) => image.id),
      ...variant,
    })));

    return res.json({
      success: true,
      product,
      productDisplay,
      productCategories,
      attributes,
      storedVariants,
      variantAttributes
    })

  } catch (error) {
    await ErrorHandler.getInstance()
      .throw(ErrorMessages.GENERIC('CreateProduct', JSON.stringify(error)));
    return res.json({ success: false, products: [] });
  }
}

export default Handler;