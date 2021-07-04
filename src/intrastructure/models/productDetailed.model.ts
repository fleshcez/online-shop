import { Product } from "./product.model";

export interface ProductDetailed extends Product {
    detailedDescription: string;
}