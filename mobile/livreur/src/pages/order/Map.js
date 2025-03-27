import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useLocation } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import marker_icon_png from 'leaflet/dist/images/marker-icon.png';
import marker_shadow_png from 'leaflet/dist/images/marker-shadow.png';
import './Map.css';

// Fix pour l'icône par défaut de Leaflet
const default_icon = L.icon({
  iconUrl: marker_icon_png,
  shadowUrl: marker_shadow_png,
});
L.Marker.prototype.options.icon = default_icon;

function map_screen() {
  const location_state = useLocation();
  const order = location_state.state && location_state.state.order ? location_state.state.order : {};

  // Coordonnées par défaut (ex : centre de Nancy)
  const default_center = [48.6921, 6.1844];

  const lat = (order.lat !== undefined && !isNaN(order.lat)) ? Number(order.lat) : default_center[0];
  const lng = (order.lng !== undefined && !isNaN(order.lng)) ? Number(order.lng) : default_center[1];
  const center = [lat, lng];

  React.useEffect(() => {
    console.log('order:', order);
    console.log('center used for map:', center);
  }, [order, center]);

  return (
    <div className="map_screen">
      <div className="order_info">
        <h3>Commande #{order.id || 'N/A'}</h3>
        <p>Restaurateur : {order.restaurant || 'Non défini'}</p>
        <p>Client : {order.client || 'Non défini'}</p>
        <p>Adresse : {order.address || 'Non défini'}</p>
        <p>Numéro : {order.phone || 'Non défini'}</p>
      </div>

      <div className="map_container">
        <MapContainer 
          center={center} 
          zoom={13} 
          style={{ height: '300px', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center}>
            <Popup>
              {order.restaurant || 'Restaurant'} <br /> {order.address || 'Adresse'}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <p className="confirmation_text">
        Confirmer la réception de la commande auprès du restaurateur
      </p>

      <button 
        className="qr_button" 
        onClick={() => alert(`Commande #${order.id || ''} : réception confirmée !`)}
      >
        Scanner le QR code
      </button>
    </div>
  );
}

export default map_screen;
