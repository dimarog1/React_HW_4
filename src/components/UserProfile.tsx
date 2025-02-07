import React from 'react';
import { Box, Typography, Avatar, styled } from '@mui/material';

const UserProfileContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    backgroundColor: '#f5f5f5',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    maxWidth: 400,
    margin: 'auto',
    marginTop: theme.spacing(8),
}));

const UserProfile: React.FC = () => {
    const user = {
        username: 'Dima Rogatnev',
        email: 'dima.rogatnev@yandex.ru',
        group: 'Student',
        avatarUrl: 'https://via.placeholder.com/150',
    };

    return (
        <UserProfileContainer>
            <Avatar src={user.avatarUrl} alt={user.username} sx={{ width: 100, height: 100, marginBottom: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>{user.username}</Typography>
            <Typography variant="body1" sx={{ color: '#555', marginBottom: 1 }}>{user.email}</Typography>
            <Typography variant="body2" sx={{ color: '#777' }}>Group: {user.group}</Typography>
        </UserProfileContainer>
    );
};

export default UserProfile;