const { Router } = require('express');
const { query, body, param } = require('express-validator');

const validateFields = require('../middlewares/validateFields');

const {
  getProducts,
  getProductById,
  addProduct,
  modifyProduct,
  deleteProduct,
} = require('../controllers/products.controller');
const convertStringIntoBool = require('../helpers/convertStringIntoBool');

const router = Router();

router.get(
  '/',
  [
    query('name').optional().trim(),
    query('isDigital').optional().customSanitizer(convertStringIntoBool),
  ],
  getProducts,
);

router.get(
  '/:productId',
  [
    param('productId').isMongoId().withMessage('Invalid product ID'),
    validateFields,
  ],
  getProductById,
);

router.post('/', [validateFields], addProduct);

router.put(
  '/:productId',
  [
    param('productId').isMongoId().withMessage('Invalid product ID'),
    validateFields,
  ],
  modifyProduct,
);

router.delete(
  '/:productId',
  [
    param('productId').isMongoId().withMessage('Invalid product ID'),
    validateFields,
  ],
  deleteProduct,
);

module.exports = router;
