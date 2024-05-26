
import RoutersHome from "./routes/RoutersHome";
import { ToastContainer } from 'react-toastify';
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit'
// import refresh from "./Layouts/RefleshToken/refresh";

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === '*:',
  // refresh: refresh
})
const App = () => {
  return (
   <AuthProvider store={store} >
   <RoutersHome/>
    <ToastContainer style={{ width: "300px", margin: "0 70px", top: "10px" }}/>
   </AuthProvider>
   );
}
 
export default App;