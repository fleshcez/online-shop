import { Action } from "redux";
import { ProductDetailed } from "../../intrastructure/models/productDetailed.model";

export enum ProductActionType {
    UpdateProduct = "PRODUCT_UpdateProduct"
}

export type ProductAction = Action<ProductActionType>;

export interface UpdateProductAction extends ProductAction {
    type: ProductActionType.UpdateProduct;
    product: ProductDetailed | undefined;
}

export function updateProduct(product: ProductDetailed | undefined): UpdateProductAction {
    return {
        product,
        type: ProductActionType.UpdateProduct
    }
}