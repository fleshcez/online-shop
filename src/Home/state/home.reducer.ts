import { HomeState } from "../../intrastructure/store/app-state";
import { HomeAction, HomeActionType, UpdateProductsAction } from "./home.actions";

const defaultState: HomeState = {
    products: []
}

function handleUpdateProducts(state: HomeState, { products }: UpdateProductsAction): HomeState {
    return {
        ...state,
        products: [...products]
    }
}

export function homeReducer(state: HomeState | undefined, action: HomeAction): HomeState {
    const newState = state || defaultState;

    switch (action.type) {
        case HomeActionType.UpdateProducts: {
            return handleUpdateProducts(newState, action as UpdateProductsAction);
        }
        default:
            return newState;
    }
}