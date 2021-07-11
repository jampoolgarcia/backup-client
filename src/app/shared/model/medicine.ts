import { CategoryI } from "./category";

export interface MedicineI {
    id?: string;
    description: string;
    price: number;
    min: number;
    quantity: number;
    categoryId: string;
    category?: CategoryI
}