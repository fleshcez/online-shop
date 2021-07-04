import { CartState } from "../../intrastructure/store/app-state";
import {
    AddEntryAction,
    CartAction,
    CartActionType,
    RemoveEntryAction,
    UpdateEntriesAction,
} from "./cart.actions";

const defaultState: CartState = {
    entries: [],
};

function handleUpdateEntries(
    state: CartState,
    { entries }: UpdateEntriesAction
): CartState {
    return {
        ...state,
        entries,
    };
}

function handleAddEntry(
    state: CartState,
    { entry }: AddEntryAction
): CartState {
    return {
        ...state,
        entries: [...state.entries, entry],
    };
}

function handleRemoveEntry(
    state: CartState,
    { entry }: RemoveEntryAction
): CartState {
    const entryIndex = state.entries.findIndex(
        (e) => e.productId === entry.productId
    );
    const entries = state.entries;

    if (entryIndex >= 0) {
        entries.splice(entryIndex, 1);
        return {
            ...state,
            entries: [...entries],
        };
    }

    return state;
}

export function cartReducer(
    state: CartState | undefined,
    action: CartAction
): CartState {
    const newState = state || defaultState;

    switch (action.type) {
        case CartActionType.UpdateEntries: {
            return handleUpdateEntries(newState, action as UpdateEntriesAction);
        }
        case CartActionType.AddEntry: {
            return handleAddEntry(newState, action as AddEntryAction);
        }
        case CartActionType.RemoveEntry: {
            return handleRemoveEntry(newState, action as RemoveEntryAction);
        }
        default:
            return newState;
    }
}
