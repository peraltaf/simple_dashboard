import React from 'react';
import { Box, Container, Divider, IconButton, Typography } from '@mui/material';
import {BsLinkedin} from 'react-icons/bs';
import {FaGithub} from 'react-icons/fa';
import { IconContext } from "react-icons";
import LOGO from '../../assets/logo-no-background.png';
import FULL_LOGO from '../../assets/logo-no-background_full.png';
import './footer.css';


const Footer = () => {
  return (
    <>
      <Divider />
      <Box sx={{ bgcolor: 'info.main' }}>
        <Container className='footer__container'>
          <Typography color='textSecondary' variant='string' sx={{ color: '#f8f8f8'}}>
            <small>&copy; All rights reserved.</small>
          </Typography>
          
          <IconButton href='https://fperalta.me/' target='_blank' rel='noreferrer' style={{ backgroundColor: 'transparent' }}>
            <img src={LOGO} alt='logo' className='logo' />
            <img src={FULL_LOGO} alt='logo' className='full_logo' />
          </IconButton>

          <IconButton href='https://www.linkedin.com/in/fperalta/' target='_blank' rel='noreferrer' sx={{ mt: '1rem', color: '#f8f8f8' }} style={{ backgroundColor: 'transparent' }}>
            <IconContext.Provider value={{ size: '1em' }}>
                <Box>
                  <BsLinkedin />
                </Box>
              </IconContext.Provider>
          </IconButton>

          <IconButton href='https://github.com/peraltaf' target='_blank' rel='noreferrer' sx={{ mt: '1rem', color: '#f8f8f8' }} style={{ backgroundColor: 'transparent' }}>
            <IconContext.Provider value={{ size: '1em' }}>
                <Box>
                  <FaGithub />
                </Box>
              </IconContext.Provider>
          </IconButton>
        </Container>
      </Box>
    </>
  )
}

export default Footer;