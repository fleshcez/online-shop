import { BuyState } from "../../../intrastructure/store/app-state";
import { Nullable } from "../../../intrastructure/types";
import { BuyAction, BuyActionType, UpdateAddressAction, UpdatePaymentAction } from "./buy.actions";

const defaultState: BuyState = {
    address: {
        address1: '',
        address2: '',
        city: '',
        firstName: '',
        lastName: '',
        zip: '',
        region: ''
    },
    payment: {
        cardNumber: '',
        expiryMonth: 1,
        expiryYear: 2021,
        nameOnCard: ''
    }
}

function handleUpdateAddress(state: BuyState, {address}: UpdateAddressAction) {
    return {
        ...state,
        address: {...address}
    };
}

function handlerUpdatePayment(state: BuyState, {payment}: UpdatePaymentAction) {
    return {
        ...state,
        payment: {...payment}
    }
}

export function buyReducer(
    state: Nullable<BuyState>,
    action: BuyAction
): BuyState {
    const newState = state || defaultState;

    switch(action.type) {
        case BuyActionType.UpdateAddress: {
            return handleUpdateAddress(newState, action as UpdateAddressAction);
        }
        case BuyActionType.UpdatePayment: {
            return handlerUpdatePayment(newState, action as UpdatePaymentAction);
        }
        default: {
            return newState;
        }
    }
}