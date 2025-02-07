import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeProduct, updateProductCategory } from '../slices/productsSlice';
import { styled, Button } from '@mui/material';
import ProductCard from './ProductCard';
import Modal from './ModalWindow';
import Pagination from './Pagination';
import AddProductForm from './AddProductForm';

type Product = {
    id: string;
    name: string;
    description: string;
    category: string;
    quantity: number;
    price: number;
    unit: string;
    imageUrl?: string;
};

interface ProductListProps {
    filters: {
        name: string;
        category: string;
        nonZeroQuantity: boolean;
    };
}

const ProductListContainer = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
}));

const ProductsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: theme.spacing(5),
    paddingLeft: theme.spacing(4),
    paddingTop: theme.spacing(6),
}));

const StyledPagination = styled(Pagination)(({ theme }) => ({
    marginTop: theme.spacing(4),
}));

const ProductList: React.FC<ProductListProps> = ({ filters }) => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products.products);
    const categories = useSelector((state: RootState) => state.categories.categories);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const itemsPerPage = 6;

    useEffect(() => {
        categories.forEach(category => {
            const oldCategory = products.find(product => product.category === category.name)?.category;
            if (oldCategory && oldCategory !== category.name) {
                dispatch(updateProductCategory({ oldCategory, newCategory: category.name }));
            }
        });
    }, [categories, dispatch, products]);

    const handleCardClick = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteProduct = (id: string) => {
        dispatch(removeProduct(id));
    };

    const handleOpenAddProductModal = () => {
        setIsAddProductModalOpen(true);
    };

    const handleCloseAddProductModal = () => {
        setIsAddProductModalOpen(false);
    };

    const filteredProducts = products.filter((product) => {
        const nameMatch = new RegExp(filters.name, 'i').test(product.name);
        const categoryMatch = filters.category ? product.category === filters.category : true;
        const quantityMatch = filters.nonZeroQuantity ? product.quantity > 0 : true;
        return nameMatch && categoryMatch && quantityMatch;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    return (
        <ProductListContainer>
            <ProductsContainer>
                {currentProducts.map((product, index) => (
                    <ProductCard key={index} {...product} onDelete={() => handleDeleteProduct(product.id)} />
                ))}
            </ProductsContainer>
            <StyledPagination
                totalItems={filteredProducts.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
            <Button variant="contained" color="primary" onClick={handleOpenAddProductModal} sx={{ marginTop: 2 }}>
                Add Product
            </Button>
            <Modal isOpen={isAddProductModalOpen} onClose={handleCloseAddProductModal}>
                <AddProductForm />
            </Modal>
            <Modal isOpen={!!selectedProduct} onClose={handleCloseModal}>
                {selectedProduct && (
                    <div style={{ textAlign: 'center' }}>
                        <h3>{selectedProduct.name}</h3>
                        {selectedProduct.imageUrl ? (
                            <img src={selectedProduct.imageUrl} alt={selectedProduct.name} style={{ width: '200px', height: 'auto', margin: '16px 0' }} />
                        ) : (
                            <div style={{ margin: '16px 0', opacity: 0.5 }}>[No Image]</div>
                        )}
                        <p>{selectedProduct.description}</p>
                        <p>Category: {selectedProduct.category}</p>
                        <p>Quantity: {selectedProduct.quantity}</p>
                        <p>Price: ${selectedProduct.price}</p>
                    </div>
                )}
            </Modal>
        </ProductListContainer>
    );
};

export default ProductList;