import { Product } from "../models/product.model";

export const products: Product[] = [
    {
        availableAmount: 3,
        id: "000-001",
        title: "Volkswagen Golf",
        description: "A nice car",
        imageSrc:
            "https://cdn.pixabay.com/photo/2019/07/12/12/49/vw-4332807_960_720.jpg",
        price: 100,
    },
    {
        availableAmount: 0,
        id: "000-002",
        title: "Volkswagen Passat",
        description: "A nice car2",
        imageSrc:
            "https://cdn.pixabay.com/photo/2015/07/30/00/30/pkw-866769_960_720.jpg",
        price: 200,
    },
    {
        availableAmount: 6,
        id: "000-003",
        title: "Volkswagen Tiguan",
        description: "A nice car 3",
        price: 150,
        imageSrc:
            "https://cdn.pixabay.com/photo/2019/01/27/15/45/vw-3958334_960_720.jpg",
    },
    {
        availableAmount: 3,
        id: "000-004",
        title: "Volkswagen Polo",
        description: "Subcompact car",
        price: 100,
        imageSrc:
            "https://cdn.pixabay.com/photo/2021/02/11/18/49/volkswagen-6006145_960_720.jpg",
    },
];
