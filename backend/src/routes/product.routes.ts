import { Router } from 'express';
import {
  getProducts,
  getFlashDeals,
  getOrganicSpecial,
  getProductBySlug,
  searchSuggestions,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', getProducts);
router.get('/flash-deals', getFlashDeals);
router.get('/organic-special', getOrganicSpecial);
router.get('/search/suggestions', searchSuggestions);
router.get('/slug/:slug', getProductBySlug);

router.post('/', authenticate, authorize('admin', 'vendor'), createProduct);
router.put('/:id', authenticate, authorize('admin', 'vendor'), updateProduct);
router.delete('/:id', authenticate, authorize('admin', 'vendor'), deleteProduct);

export default router;
