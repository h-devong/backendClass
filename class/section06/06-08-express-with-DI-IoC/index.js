import express from 'express';
import { Productcontroller } from './mvc/controllers/product.controller.js';
import { CouponController } from './mvc/controllers/coupon.controller.js';
import { CashService } from './mvc/controllers/services/cash.service.js';
import { ProductService } from './mvc/controllers/services/product.service.js';
import { PointService } from './mvc/controllers/services/point.service.js';
const app = express();

// =====의존성 주입으로 발생하는 장점 =====
// 1.의존성 주입으로 한번에 변경 가능
// 2.new 한번으로 모든 곳에서 재사용 (싱글톤 패턴)
// 3.의존성 주입으로 쿠폰 구매 방식을 포인트 결제 방식으로 안전하게 변경 가능

// [부가 설명]
//1. productController가 CashService에 의존하고 있음 {CashService => 의존성}
// => 이 상황을 "강하게 결합되어있다" 라고 표현
// => tight-coupling

//2. 이를 개선하기 위해 "느슨한 결합"으로 변경할 필요가 있음
// => loose-coupling
// => 이를 "의존성 주입"으로 해결 (의존성주입: Dependency-injection 줄여서 DI)
// => 이 역활을 대신 해주는 도구 nest.js 도구: IoC 컨테이너

// 3. "의존성 주입"으로 싱글톤 패턴 구현 가능해짐
// => "의존성 주입" 이면 "싱글톤 패턴인가?" < 이건 아님
const productService = new ProductService();
const cashService = new CashService();
const pointService = new PointService();

const productController = new Productcontroller(cashService, productService);
//상품 api
app.post('/products/buy', productController.buyProduct);
app.post('/products/refund', productController.refundProduct);
// 쿠폰 api
const couponController = new CouponController(pointService);
app.post('/coupons/buy', couponController.buyCoupon);

app.listen(3000);
