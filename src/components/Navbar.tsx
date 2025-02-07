import React from 'react';
import { AppBar, Toolbar, IconButton, Button, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

interface NavbarProps {
    toggleSidebar: () => void;
}

const StyledAppBar = styled(AppBar)(() => ({
    width: '100%',
    margin: 0,
    backgroundColor: '#333',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 1px 11px 0 #2196F3',
}));

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => (
    <StyledAppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button color="inherit">Products</Button>
            </Link>
            <Link to="/categories" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button color="inherit">Categories</Button>
            </Link>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button color="inherit">About</Button>
            </Link>
            <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button color="inherit">Profile</Button>
            </Link>
            <IconButton edge="end" color="inherit" onClick={toggleSidebar}>
                <MenuIcon />
            </IconButton>
        </Toolbar>
    </StyledAppBar>
);

export default Navbar;