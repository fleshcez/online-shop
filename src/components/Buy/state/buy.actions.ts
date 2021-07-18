import { Action } from "redux";
import { Payment, Address } from "../../../intrastructure/models/buy.model";

export enum BuyActionType {
    UpdateAddress = "BUY_UpdateAddress",
    UpdatePayment = "BUY_UpdatePayment"
}

export type BuyAction = Action<BuyActionType>;

export interface UpdateAddressAction extends BuyAction {
    type: BuyActionType.UpdateAddress;
    address: Address;
}

export interface UpdatePaymentAction extends BuyAction {
    type: BuyActionType.UpdatePayment;
    payment: Payment;
}

export function updateAddress(address: Address): UpdateAddressAction {
    return {
        type: BuyActionType.UpdateAddress,
        address
    };
}

export function updatePayment(payment: Payment): UpdatePaymentAction {
    return {
        type: BuyActionType.UpdatePayment,
        payment
    };
}