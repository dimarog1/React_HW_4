import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Drawer, TextField, FormControlLabel, Checkbox, Select, MenuItem, Button, IconButton, styled, SelectChangeEvent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onApplyFilters: (filters: Filters) => void;
}

interface Filters {
    name: string;
    category: string;
    nonZeroQuantity: boolean;
}

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: 340,
        top: 70,
        height: 'calc(100% - 90px)',
        boxSizing: 'border-box',
        padding: theme.spacing(2),
        paddingTop: 40,
        zIndex: 900,
    },
}));

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onApplyFilters }) => {
    const categories = useSelector((state: RootState) => state.categories.categories);
    const uniqueCategories = Array.from(new Set(categories.map(category => category.name)));
    const [filters, setFilters] = useState<Filters>({ name: '', category: '', nonZeroQuantity: false });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        setFilters({ ...filters, category: e.target.value as string });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, nonZeroQuantity: e.target.checked });
    };

    const handleApplyFiltersClick = () => {
        onApplyFilters(filters);
        onClose();
    };

    const handleResetFilters = () => {
        const resetFilters = { name: '', category: '', nonZeroQuantity: false };
        setFilters(resetFilters);
        onApplyFilters(resetFilters);
    };

    const handleResetField = (field: keyof Filters) => {
        setFilters({ ...filters, [field]: field === 'nonZeroQuantity' ? false : '' });
    };

    return (
        <StyledDrawer anchor="right" open={isOpen} onClose={onClose} variant="persistent">
            <div>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={filters.name}
                    onChange={handleInputChange}
                    sx={{ marginBottom: 2 }}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={() => handleResetField('name')}>
                                <CloseIcon />
                            </IconButton>
                        ),
                    }}
                />
                <FormControlLabel
                    control={<Checkbox checked={filters.nonZeroQuantity} onChange={handleCheckboxChange} />}
                    label="In stock"
                    sx={{ marginBottom: 2 }}
                />
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <Select
                        fullWidth
                        value={filters.category}
                        onChange={handleSelectChange}
                        displayEmpty
                        renderValue={(selected) => (selected ? selected : 'Choose category')}
                    >
                        <MenuItem value="">Choose category</MenuItem>
                        {uniqueCategories.map((categoryName) => (
                            <MenuItem key={categoryName} value={categoryName}>
                                {categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                    {filters.category && (
                        <IconButton onClick={() => handleResetField('category')}>
                            <CloseIcon />
                        </IconButton>
                    )}
                </div>
                <Button variant="contained" color="primary" fullWidth onClick={handleApplyFiltersClick} sx={{ marginBottom: 2 }}>
                    Apply
                </Button>
                <Button variant="outlined" color="secondary" fullWidth onClick={handleResetFilters}>
                    Reset
                </Button>
            </div>
        </StyledDrawer>
    );
};

export default Sidebar;