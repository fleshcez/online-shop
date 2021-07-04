import { Dispatch } from "redux";
import { Product } from "../../intrastructure/models/product.model";
import { AppState } from "../../intrastructure/store/app-state";
import { addEntry } from "./cart.actions";

export function addEntryThunk(entry: Product) {
    return (dispatch: Dispatch, getState: () => AppState) => {
        const state = getState();
        const entryFound = state.cart.entries.some(e => e.productId === entry.id);
        if (entryFound) {

        } else {
            dispatch(addEntry({
                amount: 1,
                productId: entry.id,
                description: entry.description,
                unitPrice: entry.price,
                imageSrc: entry.imageSrc,
                title: entry.title
            }))
        }
    };
}
