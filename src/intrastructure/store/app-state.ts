import { CartEntry } from "../models/cart.model";
import { Product } from "../models/product.model";
import { ProductDetailed } from "../models/productDetailed.model";

export interface HomeState {
    products: Product[];
}

export interface ProductState {
    product: ProductDetailed | undefined;
}

export interface CartState {
    entries: CartEntry[];
}

export interface AppState {
    home: HomeState;
    product: ProductState;
    cart: CartState;
}