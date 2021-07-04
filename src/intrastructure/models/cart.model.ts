export interface CartEntry {
    productId: string;
    description: string;
    unitPrice: number;
    amount: number;
    imageSrc?: string;
    title: string;
}

export interface Cart {
    entries: CartEntry[] | [];
}