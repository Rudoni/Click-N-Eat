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
import OrderConfirmation from './pages/client/OrderConfirmation';
import Carte from './pages/Restaurateur/Carte';
import CreateArticle from './pages/Restaurateur/create-article';
import RestaurantSettings from './pages/Restaurateur/RestaurantSettings';
import Profile from './pages/client/Profile';
import EditArticle from './pages/Restaurateur/EditArticle';
import CreateMenu from './pages/Restaurateur/CreateMenu';
import Parrainage from './pages/Common/Parrainage';
import WebSocketComponent from "./pages/test";
import WebSocketComponentLivereur from "./pages/delivery/test2"

import Livraison from './pages/delivery/Livraison';
import HistoriqueLivraison from './pages/delivery/HistoriqueLivraison';
import RecapCommande from './pages/delivery/RecapCommande';
import LivrerCommande from './pages/delivery/LivrerCommande';
import MobileFooterSwitcher from './components/MobileFooterSwitcher';
import RestaurantDashboard from './pages/Restaurateur/Dashboard';
import GestionCommandes from './pages/Restaurateur/OrderManagement';
import Unauthorized from './pages/Common/Unauthorized';

import UserOrder from './pages/client/viewOrder'

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
        <Route path="/confirmation" element={<OrderConfirmation/>} />
        <Route path="/parrainage" element={<Parrainage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails key={window.location.pathname} />}/>
        <Route path="/editArticle/:articleId" element={<EditArticle />} />
        <Route path="/editArticle" element={<EditArticle />} />
        <Route path="/createMenu" element={<CreateMenu />} />
        <Route path="/livraison" element={<Livraison />} />
        <Route path="/historique-livraisons" element={<HistoriqueLivraison />} />
        <Route path="/accepter-commande" element={<RecapCommande />} />
        <Route path="/livrer-commande" element={<LivrerCommande />} />
        <Route path="/Dashboard" element={<RestaurantDashboard />} />
        <Route path="/OrderManagement" element={<GestionCommandes />} />
        <Route path="/livraison2" element={<WebSocketComponentLivereur />} />


        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/testSocket" element={<WebSocketComponent />} />
        <Route path="/viewOrder" element={<UserOrder />} />

      </Routes>
      <Footer />
      <MobileFooterSwitcher />
    </Router>
  );
}

export default App;

