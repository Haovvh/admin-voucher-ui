import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import accountSetting from '../services/header.service'


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  useEffect(()=>{
    
  })

  return (
    <>
      <Helmet>
        <title> Dashboard  </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        
      </Container>
    </>
  );
}
