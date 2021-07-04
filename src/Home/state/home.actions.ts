import { Action } from "redux";
import { Product } from "../../intrastructure/models/product.model";

export enum HomeActionType {
    UpdateProducts = "HOME_UpdateProducts"
}

export type HomeAction = Action<HomeActionType>;

export interface UpdateProductsAction extends HomeAction {
    type: HomeActionType.UpdateProducts;
    products: Product[];
}

export function updateProducts(products: Product[]): UpdateProductsAction {
    return {
        products,
        type: HomeActionType.UpdateProducts
    };
}