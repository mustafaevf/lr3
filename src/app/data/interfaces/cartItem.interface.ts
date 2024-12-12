import { Product } from "./product.interface";

export interface CartItem {
    id: number;
    count: number;
    createdAt: string;
    userId: number;
    product: Product;
}