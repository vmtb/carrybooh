import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import {
  Image,
  ScrollView,
  Alert,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Button from 'react-native-button';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import DynamicAppStyles from '../../DynamicAppStyles';
import styles from './styles';
import Hamburger from '../../components/Hamburger/Hamburger';
import { Appearance } from 'react-native-appearance';
import { firebase } from '../../Core/firebase/config';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import VendorAppConfig from './../../VendorAppConfig';

const regexForPhoneNumber = /\d{9}$/;

const ReservationScreen = (props) => {
  const { navigation, route } = props;
  const appConfig = route.params.appConfig;

  const colorScheme = Appearance.getColorScheme();
  const restaurantRef = useRef(null);
  const reservationRef = firebase.firestore().collection(appConfig.tables.RESERVATIONS)
  const unsubscribeRestaurants = useRef(null);
  const unsubscribeReservations = useRef(null);

  const currentUser = useSelector((state) => state.auth.user);

  const [vendor, setVendor] = useState(route.params?.vendor ?? {});
  const [reservations, setReservations] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');

  useLayoutEffect(() => {
    if (!appConfig.isMultiVendorEnabled) {
      navigation.setOptions({
        headerLeft: () => (
          <Hamburger
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
        title: IMLocalized('Reservation'),
      });
    }
    navigation.setOptions({
      title: IMLocalized('Reservation'),
    });
  }, []);

  useEffect(() => {
    return () => {
      if (!VendorAppConfig.isMultiVendorEnabled) {
        restaurantRef.current = firebase
          .firestore()
          .collection(appConfig.tables.VENDORS)
          .limit(1);
      }
    };
  }, []);

  useEffect(() => {
    setFirstName(currentUser.firstName);
    setLastName(currentUser.lastName);
    setPhone(currentUser.phone);
    if (!VendorAppConfig.isMultiVendorEnabled) {
      unsubscribeRestaurants.current = restaurantRef.onSnapshot(
        onVendorsCollectionUpdate,
      );
    }
    unsubscribeReservations.current = reservationRef
      .orderBy('createdAt', 'desc')
      .where('authorID', '==', currentUser.id)
      .onSnapshot(onReservationUpdate, (error) => {
        console.log(error);
      });
  }, [currentUser?.id]);

  useEffect(() => {
    return () => {
      if (!VendorAppConfig.isMultiVendorEnabled) {
        unsubscribeRestaurants?.current && unsubscribeRestaurants.current();
      }
      unsubscribeReservations?.current && unsubscribeReservations.current();
    };
  }, []);

  const onReservationUpdate = (querySnapshot) => {
    const reservations = [];
    querySnapshot.forEach((doc) => {
      reservations.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setReservations(reservations);
  };

  const onVendorsCollectionUpdate = (querySnapshot) => {
    const vendors = [];
    querySnapshot.forEach((doc) => {
      vendors.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    if (vendors?.length > 0) {
      setVendor(vendors[0]);
    }
  };

  const onReserve = () => {
    const regexResult = regexForPhoneNumber.test(phone);

    if (firstName && lastName && phone && details && regexResult) {
      reservationRef
        .add({
          authorID: currentUser.id,
          firstname: firstName,
          lastname: lastName,
          phone: phone,
          detail: details,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          vendorID: vendor.id,
        })
        .then((_response) => {
          setFirstName(currentUser?.firstName);
          setLastName(currentUser?.lastName);
          setPhone(currentUser?.phone);
          setDetails(details);
          Alert.alert(
            '',
            IMLocalized('Your reservation was successful.'),
            [{ text: IMLocalized('OK') }],
            {
              cancelable: false,
            },
          );
          navigation.navigate('ReservationHistoryScreen', { appConfig });
        })
        .catch(function (error) {
          alert(error);
        });
    } else if (!regexResult && firstName && lastName && phone && details) {
      Alert.alert(
        '',
        IMLocalized(
          'Your phone number is invalid. Please use a valid phone number.',
        ),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
    } else {
      Alert.alert(
        '',
        IMLocalized('Please fill out all the required fields.'),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
    }
  };

  const onViewPastReservation = () => {
    navigation.navigate('ReservationHistoryScreen', {
      appConfig,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <FastImage
          placeholderColor={DynamicAppStyles.colorSet[colorScheme].grey9}
          style={styles.photo}
          source={{ uri: vendor.photo }}
        />
        <View style={styles.overlay} />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}> {vendor.title} </Text>
        <Text style={styles.description}> {vendor.address} </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            onChangeText={(text) => setFirstname(text)}
            value={firstName}
            placeholderTextColor={DynamicAppStyles.colorSet[colorScheme].grey9}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            onChangeText={(text) => setLastName(text)}
            value={lastName}
            placeholderTextColor={DynamicAppStyles.colorSet[colorScheme].grey9}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Phone Number"
            onChangeText={(text) => setPhone(text)}
            value={phone}
            placeholderTextColor={DynamicAppStyles.colorSet[colorScheme].grey9}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Reservation Details"
            onChangeText={(text) => setDetails(text)}
            value={details}
            placeholderTextColor={DynamicAppStyles.colorSet[colorScheme].grey9}
            underlineColorAndroid="transparent"
          />
        </View>
        <Button
          containerStyle={styles.buttonContainer}
          style={styles.buttonText}
          onPress={() => onReserve()}>
          {IMLocalized('Make Reservation')}
        </Button>
        <Button
          containerStyle={[
            styles.secondaryButtonContainer,
            { display: !reservations.length ? 'none' : 'flex' },
          ]}
          style={styles.secondaryButtonText}
          onPress={onViewPastReservation}>
          {IMLocalized('View Past Reservations')}
        </Button>
        <View
          style={[styles.buttonContainer, { backgroundColor: 'transparent' }]}
        />
      </View>
    </ScrollView>
  );
};

export default ReservationScreen;
