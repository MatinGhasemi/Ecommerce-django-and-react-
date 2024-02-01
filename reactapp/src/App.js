import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Home from './Pages/homePage';
import Detail from './Pages/detailPage';
import CategoryView from './Pages/category'; 
import Accounts from './Pages/accounts';
import Register from './Pages/register';
import AddAddress from './Pages/addAddress';
import EditAddress from './Pages/editAddress';
import Cart from './Pages/cart';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path='' />
        <Route Component={Detail} path='product/:id/' />
        <Route Component={CategoryView} path='category/:category/' />
        <Route Component={Accounts} path='accounts/' />
        <Route Component={Register} path='accounts/register/' />        
        <Route Component={AddAddress} path='add/useraddress/' />   
        <Route Component={EditAddress} path='edit/useraddress/' />
        <Route Component={Cart} path='accounts/cart/' />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
