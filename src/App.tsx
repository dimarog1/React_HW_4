import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductList from './components/ProductList';
import UserProfile from './components/UserProfile';
import ProductDetails from './components/ProductDetails';
import CategoriesPage from './components/CategoriesPage';
import { setInitialProducts } from './slices/productsSlice';
import { addCategory } from './slices/categoriesSlice';

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initialProducts = [
            { id: '1', name: 'Product A', description: 'Description for Product A', category: 'Category A', quantity: 10, price: 100, unit: 'kg', imageUrl: 'https://via.placeholder.com/150' },
            { id: '2', name: 'Product B', description: 'Description for Product B', category: 'Category B', quantity: 5, price: 200, unit: 'pcs', imageUrl: 'https://via.placeholder.com/150' },
            { id: '3', name: 'Product C', description: 'Description for Product C', category: 'Category C', quantity: 8, price: 150, unit: 'liters', imageUrl: 'https://via.placeholder.com/150' },
        ];
        dispatch(setInitialProducts(initialProducts));
        const uniqueCategories = new Set(initialProducts.map(product => product.category));
        uniqueCategories.forEach(category => dispatch(addCategory(category)));
    }, [dispatch]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [filters, setFilters] = useState({ name: '', category: '', nonZeroQuantity: false });

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleApplyFilters = (newFilters: { name: string; category: string; nonZeroQuantity: boolean }) => {
        setFilters(newFilters);
        setIsSidebarOpen(false);
    };

    return (
        <>
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} onApplyFilters={handleApplyFilters} />
            <Routes>
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/" element={<ProductList filters={filters} />} />
            </Routes>
        </>
    );
};

export default App;