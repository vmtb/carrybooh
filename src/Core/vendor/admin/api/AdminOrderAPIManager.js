import { firebase } from '../../../firebase/config';
import { VENDOR_ORDERS } from '../../../../Configuration';

export class AdminOrderAPIManager {
  constructor(updateOrder = console.log) {
    this.ref = firebase
      .firestore()
      .collection(VENDOR_ORDERS)
      .where('authorID', '==', 'WKpTfDzvg8WxGgliOFRMG9uiGWF2')
      .orderBy('createdAt', 'desc');
    this.updateOrder = updateOrder;

    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate, (error) => {
      console.log(error);
    });
  }

  onDelete = (orderID) => {
    firebase
      .firestore()
      .collection('restaurant_orders')
      .doc(orderID)
      .delete()
      .then((result) => console.warn(result));
  };

  onCollectionUpdate = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      const { foods } = doc.data();
      data.push({
        id: doc.id,
        list: foods,
      });
    });
    this.updateOrder(data);
  };
}
