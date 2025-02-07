import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { updateProductCategory } from './productsSlice';
import { RootState } from '../store';

interface Category {
    id: string;
    name: string;
}

interface CategoriesState {
    categories: Category[];
}

const initialState: CategoriesState = {
    categories: [],
};

export const updateCategoryThunk = createAsyncThunk(
    'categories/updateCategory',
    async (category: Category, { dispatch, getState }) => {
        const state = getState() as RootState;
        const oldCategory = state.categories.categories.find(cat => cat.id === category.id)?.name;
        if (oldCategory) {
            dispatch(updateProductCategory({ oldCategory, newCategory: category.name }));
        }
        return category;
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<string>) => {
            if (!state.categories.some(category => category.name === action.payload)) {
                state.categories.push({ id: uuidv4(), name: action.payload });
            }
        },
        removeCategory: (state, action: PayloadAction<string>) => {
            state.categories = state.categories.filter(category => category.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateCategoryThunk.fulfilled, (state, action: PayloadAction<Category>) => {
            const index = state.categories.findIndex(category => category.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        });
    },
});

export const { addCategory, removeCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
export { updateCategoryThunk as updateCategory };