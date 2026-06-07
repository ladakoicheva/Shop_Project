import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './Loading.css'
export default function CircularIndeterminate() {
  return (
    <Box className='loaderContainer' >
      <CircularProgress className='loader' aria-label="Loading…" />
    </Box>
  );
}