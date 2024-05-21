import { Link as MuiLink } from '@mui/material';

export default function Link(props) {
  return <MuiLink 
  underline="hover" 
  {...props} />;
}