import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './Loading.css'
import { useSelector } from 'react-redux';
export default function CircularIndeterminate() {
  const {isLoading} = useSelector((s)=>s.loading)
  if (!isLoading) return null;
  return (
    <Box className='loaderContainer' >
      <CircularProgress className='loader' aria-label="Loading…" />
    </Box>
  );
}