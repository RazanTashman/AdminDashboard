
import './App.css';
import { BrowserRouter, Switch, Route} from   "react-router-dom";
import LogIn from "./comp/Auth/logIn"
import Nav from "./comp/navBar/nav"
import AddItems from "./comp/items/addItems"
import ItemsList from "./comp/items/itemsList"
import OrderList from "./comp/orders/ordersList"
import Home from "./comp/home/home"
import Invoice from "./comp/invoice/invoice"
import EditItems from "./comp/items/editItems"
import ProtectedRoute from "react-protected-route-component";
import NotFoundPage from "./comp/Auth/notFound"
function App() {

  function ProtecRoute() {
    const token = localStorage.getItem('token');
    if(token){
      return true;
    }else{
      return false;
    }
  }
  return (
    <div>
      <BrowserRouter>
        
        
          <div>
            <Switch>
              {/* <Route path ='/' exact  component ={NotFoundPage}></Route> */}
              
              <Route path ='/' exact component ={LogIn}></Route>
              <ProtectedRoute path ='/additem' guardFunction={()=>ProtecRoute()}  component ={AddItems}/>
              <ProtectedRoute path ='/items' guardFunction={()=>ProtecRoute()} component ={ItemsList}/>
              <ProtectedRoute path ='/orders' guardFunction={()=>ProtecRoute()} component ={OrderList}/>
              <ProtectedRoute path ='/invoice' guardFunction={()=>ProtecRoute()} component ={Invoice}/>
              <Route path ='/item/:id' exact component ={EditItems}></Route>
              <ProtectedRoute path ='/home' guardFunction={()=>ProtecRoute()} component ={Home}/>
              <Route  component ={NotFoundPage}></Route>
            </Switch>
          </div>
        
    </BrowserRouter>
      <home/>
    
    </div>
  );
}

export default App;
