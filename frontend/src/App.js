import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Common/Home';
import Login from './pages/Common/Login';
import ForgotPassword from './pages/Common/ForgotPassword';
import Register from './pages/Common/Register';
import Contact from './pages/Common/Contact';
import Header from './components/Header'; 
import Footer from './components/Footer';
import Command from './pages/Client/Command';
import PrivacyPolicy from './pages/Common/Privacy';
import NotFound from './pages/Common/NotFound';
import RestaurantDetails from './pages/Restaurateur/RestaurantDetails';
import Cart from './pages/Client/Cart';
import Checkout from './pages/Client/Checkout';
import RestaurantCreation from './pages/Restaurateur/RestaurantCreation';
import OrderConfirmation from './pages/Client/OrderConfirmation';
import Carte from './pages/Restaurateur/Carte';
import CreateArticle from './pages/Restaurateur/create-article';



function App() {
  return (
    <Router>
     <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login key="/login" />} />
        <Route path="/register" element={<Register key="/register" />} />
        <Route path="/forgot-password" element={<ForgotPassword key="/forgot-password" />} />
        <Route path="/contact" element={<Contact key="/contact" />} />
        <Route path="/commander" element={<Command key="/commander" />} />
        <Route path="/privacy" element={<PrivacyPolicy key="/privacy" />} />
        <Route path="/create-restaurant" element={<RestaurantCreation key="/create-restaurant" />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<OrderConfirmation />} />
        <Route path="/carte" element={<Carte/>} />
        <Route path="/create-article" element={<CreateArticle />}/>
        <Route
          path="/restaurant/:id"
          element={<RestaurantDetails key={window.location.pathname} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
