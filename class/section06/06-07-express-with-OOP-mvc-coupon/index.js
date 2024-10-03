import express from 'express';
import { Productcontroller } from './mvc/controllers/product.controller.js';
import { CouponController, CouponController } from './mvc/controllers/coupon.controller.js';
const app = express();

const productController = new Productcontroller();
//상품 api
app.post('/products/buy', productController.buyProduct);
app.post('/products/refund', productController.refundProduct);
// 쿠폰 api
const couponController = new CouponController();
app.post('coupons/buy', couponController.buyCoupon);
app.listen(3000);
