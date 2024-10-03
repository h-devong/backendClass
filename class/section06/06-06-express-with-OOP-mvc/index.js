import express from 'express';
import { Productcontroller } from './mvc/controllers/product.controller.js';

const app = express();

const productController = new Productcontroller();

//상품 api
app.post('/products/buy', productController.buyProduct);
app.post('/products/refund', productController.refundProduct);

app.listen(3000);
