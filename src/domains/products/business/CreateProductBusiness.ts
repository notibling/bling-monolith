import _ from 'lodash';

import { IRawProduct, ProductModel } from "@/models/Product";
import { ProductAttributeModel } from "@/models/ProductAttribute";
import { ProductCategoryModel } from "@/models/Categories/ProductCategoryModel";
import { IRawProductVariant, ProductVariantAttributeModel, ProductVariantModel } from "@/models/ProductVariant";
import { ProductDisplayModel } from '@/models/ProductDisplay/ProductDisplayModel';

class CreateProductBusiness {

  createProduct(userId: number, product: Partial<IRawProduct>) {
    return ProductModel.create({
      userId: userId,
      ...product,
      ...(product.images ? { images: JSON.stringify(product.images) } : {}),
      ...(product.sellingZone ? { sellingZone: JSON.stringify(product.sellingZone) } : {}),
      ...(product.paymentMethods ? { paymentMethods: JSON.stringify(product.paymentMethods) } : {})
    });
  }

  createProductDisplay(userId: number, productId: number) {
    return ProductDisplayModel.create({
      displayOwner: userId,
      productId: productId,
      revenuePercentage: 0,
      expirationDate: null,
    })
  }

  async createProductCategories(productId: number, productCategories: number[]) {
    const categories = await ProductCategoryModel.create(
      productCategories.map((categoryId) => ({ productId, categoryId }))
    );

    return categories;
  }

  async createAttributes(productId: number, _attributes: any) {


    const tmpAttributes = _attributes.map((attribute: any) => {

      return {
        attributeId: attribute.attributeId,
        attributeName: attribute.attributeName,
        attributeValue: attribute.attributeValue,
        productId: productId
      }

    });

    const attributes = await ProductAttributeModel.create(
      tmpAttributes
    );

    return attributes;
  }


  async createVariants(productId: number, variants: Partial<IRawProductVariant>[]) {
    console.log(variants);

    const _variants = variants.map((variant: any) => {
      return {
        ...variant,
        ...(variant.images ? { images: JSON.stringify(variant.images) } : {}),
        productId,
      }
    });

    return await ProductVariantModel.create(_variants);
  }


  async createVariantsAttributes(storedVariantsIds: number[], variants: Partial<IRawProductVariant>[]) {
    const variantAttributes = _.compact(variants.flatMap((val, index) => {
      const variantId = storedVariantsIds[index];

      return val.variantAttributes?.map(({ id: _id, ...attr }) => ({ ...attr, variantId, }));
    }))

    return await ProductVariantAttributeModel.create(variantAttributes)
  }

}

export { CreateProductBusiness };