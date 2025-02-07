import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addCategory, updateCategory, removeCategory } from '../slices/categoriesSlice';
import { updateProductCategory } from '../slices/productsSlice';
import { Box, Button, Typography, Modal, TextField, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CategoriesPage: React.FC = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories.categories);
    const products = useSelector((state: RootState) => state.products.products);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<{ id?: string; name: string }>({ name: '' });
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const handleOpenModal = (category?: { id: string; name: string }) => {
        if (category) {
            setCurrentCategory(category);
        } else {
            setCurrentCategory({ name: '' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentCategory({ ...currentCategory, name: e.target.value });
    };

    const handleSaveCategory = () => {
        if (currentCategory.id) {
            const oldCategory = categories.find(category => category.id === currentCategory.id)?.name;
            if (oldCategory) {
                dispatch(updateProductCategory({ oldCategory, newCategory: currentCategory.name }));
            }
            dispatch(updateCategory(currentCategory));
        } else {
            if (!categories.some(category => category.name === currentCategory.name)) {
                dispatch(addCategory(currentCategory.name));
            }
        }
        setIsModalOpen(false);
    };

    const handleDeleteCategory = (id: string) => {
        const categoryInUse = products.some(product => product.category === categories.find(category => category.id === id)?.name);
        if (categoryInUse) {
            setDeleteError('This category is used by some products and cannot be deleted.');
        } else {
            dispatch(removeCategory(id));
            setDeleteError(null);
        }
    };

    const uniqueCategories = Array.from(new Set(categories.map(category => category.name)));

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>Categories</Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpenModal()} sx={{ marginBottom: 2 }}>
                Add Category
            </Button>
            {deleteError && <Typography color="error">{deleteError}</Typography>}
            <Box>
                {uniqueCategories.map((categoryName, index) => {
                    const category = categories.find(cat => cat.name === categoryName);
                    return (
                        <Box key={category?.id || index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                            <Typography variant="body1" sx={{ flexGrow: 1 }}>{categoryName}</Typography>
                            <IconButton onClick={() => handleOpenModal(category)}>
                                <EditIcon />
                            </IconButton>
                            <Tooltip title={products.some(product => product.category === categoryName) ? 'This category is used by some products and cannot be deleted.' : ''}>
                                <span>
                                    <IconButton onClick={() => handleDeleteCategory(category?.id || '')} disabled={products.some(product => product.category === categoryName)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Box>
                    );
                })}
            </Box>
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box sx={{ display: 'flex', flexDirection: 'column', padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: 400 }}>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>{currentCategory.id ? 'Edit Category' : 'Add Category'}</Typography>
                    <TextField label="Name" value={currentCategory.name} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                    <Button variant="contained" color="primary" onClick={handleSaveCategory}>Save</Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default CategoriesPage;