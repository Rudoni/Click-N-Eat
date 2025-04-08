require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const referralRoutes = require('./routes/referral.routes');

app.use(cors());
app.use(express.json());

referralRoutes(app);

const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`Referral service running on port ${PORT}`);
});
  