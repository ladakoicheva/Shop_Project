import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './Loading.css'
import { useAppSelector } from '../../redux/type';
import { memo } from 'react';

export  function CircularIndeterminate() {
  const { isLoading } = useAppSelector((s) => s.loading);
  if(!isLoading) return null
  return (
    <Box className='loaderContainer' >
      <CircularProgress className='loader' aria-label="Loading…" />
    </Box>
  );
}



export default memo(CircularIndeterminate)