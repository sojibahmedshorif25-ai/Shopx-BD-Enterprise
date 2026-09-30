import { Router } from 'express';
import {
  initSSLPayment,
  sslSuccess,
  sslFail,
  sslCancel,
} from '../controllers/payment.controller.js';

const router = Router();

router.post('/sslcommerz/init', initSSLPayment);
router.post('/success', sslSuccess);
router.get('/success', sslSuccess);
router.post('/fail', sslFail);
router.get('/fail', sslFail);
router.post('/cancel', sslCancel);
router.get('/cancel', sslCancel);
router.post('/ipn', (req, res) => res.status(200).send('IPN OK'));

export default router;
