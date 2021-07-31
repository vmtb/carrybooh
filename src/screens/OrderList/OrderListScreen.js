import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import DynamicAppStyles from '../../DynamicAppStyles';
import styles from './styles';
import Hamburger from '../../components/Hamburger/Hamburger';
import { overrideCart } from '../../Core/cart/redux/actions';
import { updateOrders } from '../../Core/delivery/redux';
import { Appearance } from 'react-native-appearance';
import { firebase } from '../../Core/firebase/config';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { VENDOR_ORDERS } from '../../Configuration';
import VendorAppConfig from '../../VendorAppConfig';
import { TNEmptyStateView } from '../../Core/truly-native';

const OrderListScreen = (props) => {
  const { navigation } = props;

  const currentUser = useSelector((state) => state.auth.user);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const unsubscribe = useRef(null);

  const colorScheme = Appearance.getColorScheme();
  const ref = firebase
    .firestore()
    .collection(VENDOR_ORDERS)
    .where('authorID', '==', currentUser.id)
    .orderBy('createdAt', 'desc');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: IMLocalized('Orders'),
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
    });
  }, []);

  useEffect(() => {
    unsubscribe.current = ref.onSnapshot(onCollectionUpdate, (error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    return () => {
      unsubscribe.current();
    };
  }, []);

  const onReorderPress = (item) => {
    overrideCart(item.products);
    navigation.navigate('Cart', {
      appStyles: DynamicAppStyles,
      appConfig: VendorAppConfig,
    });
  };

  const onCollectionUpdate = (querySnapshot) => {
    const data = [];
    setLoading(true);
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      data.push({
        id: doc.id,
        ...docData,
      });
    });
    updateOrders(data);
    setData(data);
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() =>
        props.navigation.navigate('OrderTrackingScreen', {
          item,
          appStyles: DynamicAppStyles,
        })
      }>
      <View>
        {item != null &&
          item.products != null &&
          item.products[0] != null &&
          item.products[0].photo != null &&
          item.products[0].photo.length > 0 && (
            <FastImage
              placeholderColor={DynamicAppStyles.colorSet[colorScheme].grey9}
              style={styles.photo}
              source={{ uri: item.products[0].photo }}
            />
          )}
        <View style={styles.overlay} />
        <Text style={styles.headerTitle}>
          {item?.createdAt
            ? new Date(item.createdAt.toDate()).toDateString()
            : ''}{' '}
          - {item.status}
        </Text>
      </View>
      {item.products.map((food) => {
        return (
          <View style={styles.rowContainer} key={food.id}>
            <Text style={styles.count}>{food.quantity}</Text>
            <Text style={styles.title}>{food.name}</Text>
            <Text style={styles.price}>${food.price}</Text>
          </View>
        );
      })}
      <View style={styles.actionContainer}>
        <Text style={styles.total}>
          Total: $
          {item.products
            .reduce((prev, next) => prev + next.price * next.quantity, 0)
            .toFixed(2)}
        </Text>
        <Button
          containerStyle={styles.actionButtonContainer}
          style={styles.actionButtonText}
          onPress={() => onReorderPress(item)}>
          {IMLocalized('REORDER')}
        </Button>
      </View>
    </TouchableOpacity>
  );

  const emptyStateConfig = {
    title: IMLocalized('No Orders'),
    description: IMLocalized(
      "Vous n'avez pas encore passé de commande. Vos commandes seront affichées ici.",
    ),
  };
  return (
    <>
      {data?.length === 0 && !loading && (
        <View style={styles.emptyViewContainer}>
          <TNEmptyStateView
            emptyStateConfig={emptyStateConfig}
            appStyles={DynamicAppStyles}
          />
        </View>
      )}
      <FlatList
        style={styles.flat}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        initialNumToRender={5}
      />
    </>
  );
};

export default OrderListScreen;
