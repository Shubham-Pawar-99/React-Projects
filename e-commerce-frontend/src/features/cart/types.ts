// src/features/cart/types.ts

export interface CartItem {
    productId: string;      // matches Product.id type (string or number as string)
    title: string;
    price: number;
    qty: number;
    image?: string;
    variant?: Record<string, unknown>; // size/color etc.
}

export interface CartState {
    items: CartItem[];
    totalQty: number;
    totalAmount: number;
}
