// project import
import Routes from './routes/index';
import ThemeCustomization from './themes';
import ScrollTop from './components/ScrollTop';
import "./app.css"
import AuthProvider from 'react-auth-kit'
import createStore from 'react-auth-kit/createStore';
import { ToastContainer } from 'react-toastify';
import ReactRouterPlugin from '@auth-kit/react-router'

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //
const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'http:',
  // refresh: refresh
  debug: true
})

const App = () => (
  <AuthProvider store={store} router={ReactRouterPlugin} fallbackPath='/dashbaord/login'>
  <ThemeCustomization>
    <ScrollTop>
      <Routes />
    </ScrollTop>
  </ThemeCustomization>
  <ToastContainer style={{ width: "300px", margin: "0 70px", top: "10px" }}/>
  </AuthProvider>

);

export default App;