export interface User {
    id: string;
    name: string;
    mail: string;
    role?: string[];
}

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
    category?: string;
    stock?: number;
    rating?: number;
}