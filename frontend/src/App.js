import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
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
import { CartProvider } from './context/CartContext';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/commander" element={<Command />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/create-restaurant" element={<RestaurantCreation />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
    <App />
  </CartProvider>
);

export default App;
