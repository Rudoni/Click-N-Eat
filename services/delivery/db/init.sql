CREATE DATABASE delivery;

CREATE TABLE deliveries (
  delivery_id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL,
  delivery_code VARCHAR(4) NOT NULL,
  delivery_status VARCHAR(20) NOT NULL DEFAULT 'en_attente', -- ex: en_attente, accepté, refusé, en_cours, livré
  assigned_to INTEGER, -- user_id du livreur
  accepted_at TIMESTAMP,
  delivered_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_status ON deliveries(delivery_status);
CREATE INDEX idx_assigned_to ON deliveries(assigned_to);