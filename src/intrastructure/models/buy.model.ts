export interface Address {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    region: string;
    zip: string;
}

export interface Payment {
    nameOnCard: string;
    cardNumber: string;
    expiryMonth: number;
    expiryYear: number;
}
