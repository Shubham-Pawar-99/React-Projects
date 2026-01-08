import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import type { Product } from "../../../types";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../product.slice";

const ProductListPage = () => {
    const dispatch = useAppDispatch();
    const { items, loading } = useAppSelector((s) => s.product);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAdd = (p: Product) => {
        // implement add to cart logic
        console.log("add", p.id);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Products</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {items.map((p) => (
                        <ProductCard key={p.id} product={p} onAddToCart={handleAdd} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductListPage;
