import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateProduct, removeProduct } from '../slices/productsSlice';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Dialog, DialogContent } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails: React.FC = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories.categories);
    const uniqueCategories = Array.from(new Set(categories.map(category => category.name)));
    const { id } = useParams<{ id: string }>();
    const product = useSelector((state: RootState) => state.products.products.find(p => p.id === id));
    const navigate = useNavigate();

    const [productDetails, setProductDetails] = useState(product);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        if (!product) {
            navigate('/');
        } else {
            setProductDetails(product);
        }
    }, [product, navigate]);

    if (!productDetails) {
        return null;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProductDetails({ ...productDetails, [name]: value });
    };

    const handleCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setProductDetails({ ...productDetails, category: e.target.value as string });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateProduct(productDetails));
        setIsEditModalOpen(false);
    };

    const handleDelete = () => {
        dispatch(removeProduct(id!));
        navigate('/');
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', padding: 4 }}>
            <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                <h3>{productDetails.name}</h3>
                {productDetails.imageUrl ? (
                    <img src={productDetails.imageUrl} alt={productDetails.name} style={{ width: '200px', height: 'auto', margin: '16px 0' }} />
                ) : (
                    <div style={{ margin: '16px 0', opacity: 0.5 }}>[No Image]</div>
                )}
                <p>{productDetails.description}</p>
                <p>Category: {productDetails.category}</p>
                <p>Quantity: {productDetails.quantity}</p>
                <p>Price: ${productDetails.price}</p>
                <p>Unit: {productDetails.unit}</p> {/* Add this line */}
                <Button variant="contained" color="primary" onClick={() => setIsEditModalOpen(true)} sx={{ marginTop: 4, marginRight: 2 }}>
                    Edit Product
                </Button>
                <Button variant="contained" color="secondary" onClick={handleDelete} sx={{ marginTop: 4 }}>
                    Delete Product
                </Button>

                <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                    <DialogContent>
                        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 400, margin: 'auto', padding: 2, border: '1px solid #ddd', borderRadius: 4, backgroundColor: '#fff' }}>
                            <TextField label="Name" name="name" value={productDetails.name} onChange={handleInputChange} required />
                            <TextField label="Description" name="description" value={productDetails.description} onChange={handleInputChange} required />
                            <FormControl required>
                                <InputLabel>Category</InputLabel>
                                <Select value={productDetails.category} onChange={handleCategoryChange}>
                                    {uniqueCategories.map((categoryName) => (
                                        <MenuItem key={categoryName} value={categoryName}>
                                            {categoryName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField label="Quantity" name="quantity" type="number" value={productDetails.quantity} onChange={handleInputChange} required />
                            <TextField label="Price" name="price" type="number" value={productDetails.price} onChange={handleInputChange} required />
                            <TextField label="Unit" name="unit" value={productDetails.unit} onChange={handleInputChange} required /> {/* Add this line */}
                            <TextField label="Image URL" name="imageUrl" value={productDetails.imageUrl} onChange={handleInputChange} />
                            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 4 }}>
                                Save Changes
                            </Button>
                        </Box>
                    </DialogContent>
                </Dialog>
            </Box>
        </Box>
    );
};

export default ProductDetails;