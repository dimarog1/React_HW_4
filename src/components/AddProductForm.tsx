import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addProduct } from '../slices/productsSlice';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AddProductForm: React.FC = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories.categories);
    const uniqueCategories = Array.from(new Set(categories.map(category => category.name)));
    const [product, setProduct] = useState({
        id: '',
        name: '',
        description: '',
        category: '',
        quantity: 0,
        price: 0,
        unit: '',
        imageUrl: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setProduct({ ...product, category: e.target.value as string });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addProduct(product));
        setProduct({
            id: '',
            name: '',
            description: '',
            category: '',
            quantity: 0,
            price: 0,
            unit: '',
            imageUrl: '',
        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Name" name="name" value={product.name} onChange={handleInputChange} required />
            <TextField label="Description" name="description" value={product.description} onChange={handleInputChange} required />
            <FormControl required>
                <InputLabel>Category</InputLabel>
                <Select value={product.category} onChange={handleCategoryChange}>
                    {uniqueCategories.map((categoryName) => (
                        <MenuItem key={categoryName} value={categoryName}>
                            {categoryName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField label="Quantity" name="quantity" type="number" value={product.quantity} onChange={handleInputChange} required />
            <TextField label="Price" name="price" type="number" value={product.price} onChange={handleInputChange} required />
            <TextField label="Unit" name="unit" value={product.unit} onChange={handleInputChange} required /> {/* Add this line */}
            <TextField label="Image URL" name="imageUrl" value={product.imageUrl} onChange={handleInputChange} />
            <Button type="submit" variant="contained" color="primary">
                Add Product
            </Button>
        </Box>
    );
};

export default AddProductForm;