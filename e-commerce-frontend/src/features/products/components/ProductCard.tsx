import type { Product } from "../../../types"

interface ProductCardProps {
    product: Product
    onAddToCart?: (p: Product) => void | undefined;
}
const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
    return (
        <div className="border-b-4">
            <img src={product.images?.[0] || ''} alt={product.title} className="w-full h-48 object-cover mb-2" />
            <h3 className="font-medium text-lg">{product.title}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <div>
                <span className="font-bold">{product.price}</span>
                <button
                    className="bg-blue-600 border-2 px-6 py-3 text-white"
                    onClick={() => onAddToCart?.(product)}
                >
                    Add
                </button>
            </div>
        </div>
    )
}

export default ProductCard