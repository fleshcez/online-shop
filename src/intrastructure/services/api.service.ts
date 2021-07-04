import { Product } from "../models/product.model";
import { ProductDetailed } from "../models/productDetailed.model";
import { products } from "./service.mocks";

export interface ApiService {
    getProducts(): Promise<Product[]>;
    getProduct(id: string): Promise<ProductDetailed | undefined>;
}

export class ApiServiceImplementation implements ApiService {
    public getProducts(): Promise<Product[]> {
        return new Promise((res) => {
            setTimeout(() => {
                res(products);
            }, 1000);
        });
    }

    public getProduct(id: string): Promise<ProductDetailed | undefined> {
        return new Promise((res) => {
            setTimeout(() => {
                const product = products.find((p) => p.id === id);
                const detailedProduct: ProductDetailed | undefined = product ? {...product, detailedDescription: "More detailed description"} : undefined;
                res(detailedProduct);
            }, 500);
        });
    }
}
