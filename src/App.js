import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, CssBaseline, IconButton, Toolbar } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import MainLayout from './components/MainLayout/MainLayout';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import './App.css';
import LOGO from './assets/logo-no-background_full.png';
import useGlobalState, { sidebarState } from './globalState';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const App = () => {
  const [open, setSidebarState] = useGlobalState(sidebarState);
  const handleDrawerOpen = () => {
    console.log('test')
    setSidebarState(true);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position='fixed' open={open}>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>

            <IconButton href='https://fperalta.me/' target='_blank' rel='noreferrer' style={{ backgroundColor: 'transparent' }}>
              <img src={LOGO} alt='logo' className='main_logo' />
            </IconButton>
          </Toolbar>
        </AppBar>
        
        <Sidebar />

        <Main open={open}>
          <MainLayout />
        </Main>
      </Box>

      <Footer />
    </>
  );
}

export default App;