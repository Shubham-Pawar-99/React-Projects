import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/axiosInstance";
import type { Product } from "../../../types";

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [id]);

    if (!product) return <div className="p-4">Loading...</div>;

    return (
        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <img src={product.images?.[0] || "/placeholder.png"} alt={product.title} />
            </div>
            <div>
                <h1 className="text-2xl font-bold">{product.title}</h1>
                <p className="text-lg mt-2">₹{product.price}</p>
                <p className="mt-4">{product.description}</p>
            </div>
        </div>
    );
};

export default ProductDetails;
