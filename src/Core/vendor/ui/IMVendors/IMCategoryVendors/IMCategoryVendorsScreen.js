import React, {useEffect, useLayoutEffect, useState, useRef} from 'react';
import {View,Text, FlatList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {IMLocalized} from '../../../../localization/IMLocalization';
import IMVendorsScreen from '../IMVendorsScreen';
import { VENDOR, VENDOR_CATEGORIES } from '../../../../../Configuration';
import {firebase} from '../../../../../Core/firebase/config';

export function IMCategoryVendorsScreen({route, navigation}) {
  const category = route?.params?.category;
  const appStyles = route?.params?.appStyles;
  const appConfig = route?.params?.appConfig;
  const vendors = useSelector(state => state.vendor.vendors);
  const [foods, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const categorieUnsubscribe = useRef(null);
  
  const categoriesRef = useRef(firebase
    .firestore()
    .collection(VENDOR_CATEGORIES)
    .orderBy('order'));
  useEffect(() => {
    categorieUnsubscribe.current = categoriesRef.current.onSnapshot(
      onCategoriesCollectionUpdate,
    );
    let vendorCategoryList = vendors.filter(
      vendorItem => vendorItem.categoryID === category?.id,
    );
    setVendors(vendorCategoryList);
  }, [category, vendors]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route?.params?.category
        ? `${route?.params?.category.title}`
        : IMLocalized('ACCUEIL'),
      headerRight: () => <View />,
    });
  }, []);
  const onCategoriesCollectionUpdate = (querySnapshot) => {
    setCategories(querySnapshot.docs.map((doc) => doc.data()));
  };
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={{justifyContent: 'center', height: 70}}>
      <View style={{justifyContent: 'center',  backgroundColor: '#000', margin: 5, padding: 5, borderRadius: 50 }}>
        
        <Text style={{color: '#fff', fontWeight: 'bold'}}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <>
    <IMVendorsScreen
      navigation={navigation}
      appConfig={appConfig}
      appStyles={appStyles}
      vendors={foods}
    />
    </>
  );
}
