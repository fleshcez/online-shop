import { ProductState } from "../../intrastructure/store/app-state";
import {
    ProductAction,
    ProductActionType,
    UpdateProductAction,
} from "./product.actions";

const defaultState: ProductState = {
    product: undefined,
};

function handleUpdateProduct(
    state: ProductState,
    { product }: UpdateProductAction
): ProductState {
    return {
        ...state,
        product,
    };
}

export function productReducer(
    state: ProductState | undefined,
    action: ProductAction
): ProductState {
    const newState = state || defaultState;

    switch (action.type) {
        case ProductActionType.UpdateProduct: {
            return handleUpdateProduct(newState, action as UpdateProductAction);
        }
        default:
            return newState;
    }
}
