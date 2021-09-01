export interface Product {
    id: string;
    image: string;
    nameImage: string;
    name: string;
    price: number;
    category: string;
    stock: number;
    stockVending: number;
    stockPending: number;
    isDeleted: boolean;
    createdAt: Date;
}