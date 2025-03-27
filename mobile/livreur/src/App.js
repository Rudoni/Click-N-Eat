import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './pages/order/Map';
import Login from './pages/login/Login';
import Order from './pages/order/Order';
import BottomNavBar from './components/navbar/BottomNavBar';

function App() {
  return (
    <Router>
       <div style={{ paddingBottom: '60px' }}>
        <Routes>
          <Route path="/orders" element={<Order />} />
          <Route path="/map" element={<Map />} />
          <Route path="/" element={<Login />} />
        </Routes>
       </div>
      <BottomNavBar />
    </Router>
  );
}

export default App;
