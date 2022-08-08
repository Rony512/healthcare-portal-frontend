import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useNavigate } from 'react-router-dom';

interface Pages {
    name:string;
    path:string;
}

const pages: Pages[] = [];

const style = {
    typography: {
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
    },
    typography_xl: {
        mr: 2,
        display: { xs: 'flex', md: 'none' },
        flexGrow: 1,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
    },
    box: {
        flexGrow: 1,
        display: { xs: 'flex', md: 'none' }
    },
    box_2: { flexGrow: 1, display: { xs: 'none', md: 'flex' } }
}

const ResponsiveAppBar = () => {
    const { user, logout } = useAuth0()
    const navigate = useNavigate()

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleRedirect = () => {

    }

    const handleLogout = () => {
        logout({ returnTo: window.location.origin })
    }

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                    <Typography variant="h6" sx={style.typography} >
                        LOGO
                    </Typography>
                    </Link>
                    {/* Mobile Menu */}
                    <Box sx={style.box}>
                        <IconButton onClick={handleOpenNavMenu} color="inherit" >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.length > 0 && pages.map((page) => (
                                <Link key={page.name} to={page.path} style={{ textDecoration: 'none' }}>
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                </Link>

                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        sx={style.typography_xl}
                    >
                        LOGO
                    </Typography>

                    {/* Desktop Menu */}
                    <Box sx={style.box_2}>
                        {pages.map((page) => (
                            <Link key={page.name} to={page.path} style={{ textDecoration: 'none' }}>
                                <Button onClick={handleRedirect} sx={{ my: 2, color: 'white', display: 'block' }} >
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={user ? `${user.name}` : ''}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={user ? user.name : ''} src={user ? user.picture : ''} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}

                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleLogout}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
