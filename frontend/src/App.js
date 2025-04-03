import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Header from './components/Header'; 
import Footer from './components/Footer';
import Command from './pages/Command';
import PrivacyPolicy from './pages/Privacy';
import RestaurantCreation from './pages/RestaurantCreation';
import NotFound from './pages/NotFound';
import RestaurantDetails from './pages/RestaurantDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
// import Profile from './pages/client/Profile';

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
