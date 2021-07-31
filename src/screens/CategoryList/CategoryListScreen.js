import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import Hamburger from '../../components/Hamburger/Hamburger';
import DynamicAppStyles from '../../DynamicAppStyles';
import { Appearance } from 'react-native-appearance';
import { firebase } from '../../Core/firebase/config';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { VENDOR_CATEGORIES } from '../../Configuration';
import AppConfig from '../../VendorAppConfig';
import VendorAppConfig from '../../VendorAppConfig';

const CategoryListScreen = (props) => {
  /* const navToMap() {
      if (vendors.length > 0 || vendors !== undefined) {
        this.props.navigation.navigate('Map', {vendors});
      }
    } */

  const { navigation } = props;
  const colorScheme = Appearance.getColorScheme();

  const ref = firebase.firestore().collection(VENDOR_CATEGORIES);

  const unsubscribe = useRef(null);

  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: IMLocalized('Categories'),
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
    unsubscribe.current = ref.onSnapshot(onCollectionUpdate);
    return () => {
      unsubscribe.current();
    }
  }, []);

  const onCollectionUpdate = (querySnapshot) => {
    setData(querySnapshot?.docs?.map((doc) => doc.data()));
  };

  const onPress = (item) => {
    if (VendorAppConfig.isMultiVendorEnabled) {
      props.navigation.navigate('Vendor', {
        category: item,
        appStyles: DynamicAppStyles,
        appConfig: AppConfig,
      });
    } else {
      props.navigation.navigate('SingleVendor', {
        category: item,
        appStyles: DynamicAppStyles,
        appConfig: AppConfig,
      });
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.container}>
        <FastImage
          placeholderColor={DynamicAppStyles.colorSet[colorScheme].grey9}
          style={styles.photo}
          source={{ uri: item.photo }}
        />
        <View style={styles.overlay} />
        <Text numberOfLines={3} style={styles.title}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      vertical
      showsVerticalScrollIndicator={false}
      style={styles.listStyle}
      numColumns={2}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.id}`}
    />
  );
};

export default CategoryListScreen;
