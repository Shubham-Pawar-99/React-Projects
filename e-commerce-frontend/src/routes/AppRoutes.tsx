import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import ProductDetails from "../features/products/pages/ProductDetails";
import ProductListPage from "../features/products/pages/ProductList";

const AppRoutes: React.FC = () => {
    // const auth = useAppSelector((s) => s.auth);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            {/* protected /cart etc. add ProtectedRoute wrapper if needed */}
        </Routes>
    );
};

export default AppRoutes;
