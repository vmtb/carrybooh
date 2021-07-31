import { firebase } from '../../firebase/config';

import PaymentRequestAPI from '../../payment/api/index';
import uuid from 'uuidv4';
export default class CartAPIManager {
  constructor(appConfig) {
    this.ref = firebase.firestore().collection('restaurant_orders');
    this.appConfig = appConfig;
    this.paymentRequestAPI = new PaymentRequestAPI(this.appConfig);
  }

  async chargeCustomer({ customer, currency, amount, source }) {
    const stripeResponse = await this.paymentRequestAPI.chargeStripeCustomer({
      customer,
      currency,
      amount,
      source,
      uuid: uuid(),
    });
    return stripeResponse;
  }

  placeOrder(cartItems, user, shippingAddress, vendor, callback) {
    var products = [];
    cartItems.forEach((item) => {
      const { name, photo, price, quantity } = item;
      products.push({
        id: item.id,
        cartColors: [],
        cartSizes: ['XS', 'S', 'M'],
        selectedColor: '',
        selectedSize: '',
        name,
        quantity,
        photo,
        price,
      });
    });

    var order = {
      authorID: user.id,
      author: user,
      products,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: 'Order Placed',
      address: shippingAddress,
    };

    if (vendor?.id) {
      order = {
        ...order,
        vendorID: vendor.id,
        vendor: vendor
      }
    }

    console.log(order)

    this.ref
      .add(order)
      .then((response) => {
        const finalOrder = { ...order, id: response.id };
        this.ref.doc(response.id).update(finalOrder);
        callback && callback();
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
      });
  }
}
