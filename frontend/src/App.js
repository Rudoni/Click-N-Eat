import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Common/Home';
import Login from './pages/Common/Login';
import ForgotPassword from './pages/Common/ForgotPassword';
import Register from './pages/Common/Register';
import Contact from './pages/Common/Contact';
import Header from './components/Header'; 
import Footer from './components/Footer';
import Command from './pages/client/Command';
import PrivacyPolicy from './pages/Common/Privacy';
import NotFound from './pages/Common/NotFound';
import RestaurantDetails from './pages/Restaurateur/RestaurantDetails';
import Cart from './pages/client/Cart';
import Checkout from './pages/client/Checkout';
import RestaurantCreation from './pages/Restaurateur/RestaurantCreation';
//import OrderConfirmation from './pages/client/OrderConfirmation';
import Carte from './pages/Restaurateur/Carte';
import CreateArticle from './pages/Restaurateur/create-article';
import RestaurantSettings from './pages/Restaurateur/RestaurantSettings';
import Profile from './pages/client/Profile';
import EditArticle from './pages/Restaurateur/EditArticle';


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
        <Route path="/carte" element={<Carte/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-article" element={<CreateArticle />}/>
        <Route path="/restaurant-settings" element={<RestaurantSettings/>} />
        <Route path="/restaurant/:id" element={<RestaurantDetails key={window.location.pathname} />}/>
        <Route path="*" element={<NotFound />} />
        <Route path="/editArticle/:articleId" element={<EditArticle />} />
        <Route path="/editArticle" element={<EditArticle />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
