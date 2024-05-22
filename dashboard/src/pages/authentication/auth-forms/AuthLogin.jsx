import React, {useState} from 'react'
import { Link as RouterLink } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useSignIn from 'react-auth-kit/hooks/useSignIn';
// material-ui
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

 
// project import
 import AnimateButton from '../../../components/@extended/AnimateButton';
 const API = "http://localhost:5000/api/v1/administrator/login";
// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import axios from 'axios'
import {Navigate, useLocation} from 'react-router-dom'
import {toast } from 'react-toastify';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const location = useLocation()
  const isAuthenticated = useIsAuthenticated()
  const signIn = useSignIn()
  const [checked, setChecked] = React.useState(false);
  const navigate = useNavigate();





  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginHandlerAdmin = async (event) => {
    event.preventDefault();
      const response = await axios.post(API, {
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      // Jika login berhasil, simpan data pengguna
      const userData = response.data; // Sesuaikan dengan struktur data respons dari server
      console.log(userData.data)
      if (signIn({
        auth: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8'
        },
        userState: { name: userData.data.name, _id: userData.data._id, email: userData.data.email, role: userData.data.role},
        // refresh: refresh
      }))
      {
        // If Login Successfull, then Redirect the user to secure route
        navigate('/dashboard/admin');
       } else {
        // Else, there must be some error. So, throw an error
        throw new Error("Error Occurred. Try Again");
      }
    } 
       console.log(isAuthenticated)
      if (isAuthenticated) {
        // If authenticated user, then redirect to secure dashboard
    
        return (
          <Navigate to={'/dashboard/admin'} replace/>
        )
      } else {
  return (
    <div>
       
          <form  onSubmit={loginHandlerAdmin} submit="post">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={email}
                    onChange={handleEmail}
                    placeholder="Enter email address"
                    fullWidth
                   />
                
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                     id="-password-login"
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
                    placeholder="Enter password"
                  />
                   
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                  <Link variant="h6" component={RouterLink} to="" color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
            
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation  fullWidth size="large" type="submit" variant="contained" color="primary">
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
            
            </Grid>
          </form>
 
    </div>
  );
}}

export default AuthLogin;
