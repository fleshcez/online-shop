import { Action } from "redux";
import { CartEntry } from "../../intrastructure/models/cart.model";

export enum CartActionType {
    UpdateEntries = "CART_UpdateProducts",
    AddEntry = "CART_AddEntry",
    RemoveEntry = "CART_RemoveEntry"
}

export type CartAction = Action<CartActionType>;

export interface UpdateEntriesAction extends CartAction {
    type: CartActionType.UpdateEntries;
    entries: CartEntry[];
}

export interface AddEntryAction extends CartAction {
    type: CartActionType.AddEntry;
    entry: CartEntry;
}

export interface RemoveEntryAction extends CartAction {
    type: CartActionType.RemoveEntry;
    entry: CartEntry;
}

export function updateEntries(entries: CartEntry[]): UpdateEntriesAction {
    return {
        entries,
        type: CartActionType.UpdateEntries
    };
}

export function addEntry(entry: CartEntry): AddEntryAction {
    return {
        entry,
        type: CartActionType.AddEntry
    }
}

export function removeEntry(entry: CartEntry): RemoveEntryAction {
    return {
        entry,
        type: CartActionType.RemoveEntry
    }
}