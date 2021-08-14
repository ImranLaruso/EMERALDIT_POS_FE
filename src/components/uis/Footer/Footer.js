import React from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { FooterContainer } from './Footer.styles';
import { PAGE_ROUTES } from '../../../services/routeService';

export default function Footer() {
  const { pathname } = useLocation();

  if (pathname === PAGE_ROUTES.login) {
    return null;
  }

  return (
    <FooterContainer>
      <Typography variant="body2" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://emeralditsolutions.com/">
          EmeraldIT
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </FooterContainer>
  );
}
