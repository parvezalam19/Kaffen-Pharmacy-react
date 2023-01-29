import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./pages/LoginPage/Login";
import Order from "./pages/Order/Order";
import Products from "./pages/Products/Products";
import { User } from "./pages/Users/User";

function App() {

  return (
    <Router>
        <Routes>   
          <Route path="/" element={<Login />} />
          <Route path="/order" element={<Order />} />
          <Route path="/products" element={<Products />} />
          <Route path="/user" element={<User />} />
        </Routes>
    </Router>
  );
}


export default App;
