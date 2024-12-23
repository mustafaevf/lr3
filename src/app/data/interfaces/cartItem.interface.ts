import { Product } from "./product.interface";

export interface CartItem {
    id: number ;
    count: number;
    createdAt: string;
    userId: number;
    status: number;
    product: Product;
}