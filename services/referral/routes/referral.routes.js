module.exports = function(app) {
  const controller = require('../controllers/referral.controller');

  app.get('/referral-code/:user_id', controller.getReferralCode);
  app.post('/referral-code', controller.generateReferralCode);
  app.post('/use-referral-code', controller.useReferralCode);
  app.post('/use-referral-code', controller.useReferralCode);
  app.get('/referrals/:user_id', controller.getReferredUsers);
};
