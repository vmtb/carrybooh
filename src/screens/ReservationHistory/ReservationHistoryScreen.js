import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';
import ReservationItem from '../../components/ReservationItem/ReservationItem';
import { firebase } from '../../Core/firebase/config';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import Hamburger from '../../components/Hamburger/Hamburger';
import { TNEmptyStateView } from '../../Core/truly-native';
import DynamicAppStyles from '../../DynamicAppStyles';

const ReservationHistoryScreen = (props) => {
  const { navigation, route } = props;
  const appConfig = route.params.appConfig;
  const currentUser = useSelector((state) => state.auth.user);
  const [reservations, setReservations] = useState(
    route.params.reservations ?? null,
  );
  const reservationRef = useRef(
    firebase.firestore().collection(appConfig.tables.RESERVATIONS),
  );
  const unsubscribeReservations = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: IMLocalized('Reservation History'),
    });
    if (appConfig.isMultiVendorEnabled) {
      navigation.setOptions({
        headerLeft: () => (
          <Hamburger
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      });
    }
  }, []);

  useEffect(() => {
    unsubscribeReservations.current = reservationRef.current
      .orderBy('createdAt', 'desc')
      .where('authorID', '==', currentUser.id)
      .onSnapshot(onReservationUpdate);
      return () => {
        unsubscribeReservations.current && unsubscribeReservations.current();
      };
  }, []);

  const onReservationUpdate = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setReservations(data);
  };

  const emptyStateConfig = {
    title: IMLocalized('No Reservations Yet'),
    description: IMLocalized(
      "Vous n'avez actuellement aucune réservation. Vos réservations seront affichées ici.",
    ),
  };

  return (
    <View style={styles.container}>
      {reservations && reservations.length === 0 && (
        <View style={styles.emptyViewContainer}>
          <TNEmptyStateView
            emptyStateConfig={emptyStateConfig}
            appStyles={DynamicAppStyles}
          />
        </View>
      )}
      <FlatList
        data={reservations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ReservationItem constructorObject={item} />}
        style={{ width: '95%' }}
      />
    </View>
  );
};

export default ReservationHistoryScreen;
