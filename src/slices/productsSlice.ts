import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    quantity: number;
    price: number;
    unit: string;
    imageUrl?: string;
}

interface ProductsState {
    products: Product[];
}

const initialState: ProductsState = {
    products: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setInitialProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        updateProductCategory: (state, action: PayloadAction<{ oldCategory: string; newCategory: string }>) => {
            state.products = state.products.map(product =>
                product.category === action.payload.oldCategory ? { ...product, category: action.payload.newCategory } : product
            );
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
    },
});

export const { setInitialProducts, addProduct, updateProduct, updateProductCategory, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;