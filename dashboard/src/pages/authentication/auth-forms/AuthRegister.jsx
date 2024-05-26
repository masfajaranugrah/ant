import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import axios from 'axios';
 
// project import
import AnimateButton from '../../../components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from '../../../utils/password-strength';
import {toast } from 'react-toastify';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const API = "http://localhost:5000/api/v1/administrator/register";

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };



  useEffect(() => {
    changePassword('');
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (e) => { 
    setName(e.target.value); 
    setSubmitted(false); 
  }; 

  const handleEmail = (e) => { 
    setEmail(e.target.value); 
    setSubmitted(false); 
  }; 

  const handlePassword = (e) => { 
    setPassword(e.target.value); 
    setSubmitted(false); 
  }; 

  const handleSubmit =async (e) => {
    e.preventDefault();
    await axios.post(import.meta.env.VITE_Register, {
      name: name, 
       email : email,
       password : password
    },{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function (response) {
      const MyIcon = () => (
        "🎉"
      )
      toast.success("Horee selamat anda berhasil registrasi", {
        icon: MyIcon
      })  
      navigate('/dashboard/login')
    })
    .catch(function (err) {
      const MyIcon = () => (
        "😭"
      )
      toast.warn("Registrasi kamu gagal, silahkan coba lagi", {
    
        icon: MyIcon
      })  
})
  }

  return (
    <>
      <form onSubmit={handleSubmit} method="post">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <OutlinedInput
                fullWidth
                id="name"
                value={name}
                onChange={handleName}
                inputProps={{}}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
              <OutlinedInput
                fullWidth
                id="email-login"
                type="email"
                value={email}
                onChange={handleEmail}
                placeholder="demo@company.com"
                inputProps={{}}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-signup">Password</InputLabel>
              <OutlinedInput
                fullWidth
                id="password-signup"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="******"
                inputProps={{}}
              />
            </Stack>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" fontSize="0.75rem">
                    {level?.label}
                  </Typography>
                </Grid>
              </Grid>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              By Signing up, you agree to our &nbsp;
              <Link variant="subtitle2" component={RouterLink} to="#">
                Terms of Service
              </Link>
              &nbsp; and &nbsp;
              <Link variant="subtitle2" component={RouterLink} to="#">
                Privacy Policy
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth size="large" type="submit" name="submit" variant="contained" color="primary">
              Create Account
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Divider>
              <Typography variant="caption">Sign up with</Typography>
            </Divider>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AuthRegister;
