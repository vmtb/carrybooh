import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View , ScrollView} from 'react-native';
import { ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';
import DynamicAppStyles from '../../DynamicAppStyles';
import { firebase } from '../../Core/firebase/config';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { TNEmptyStateView } from '../../Core/truly-native';
import Modal from 'react-native-modal';
import SingleItemDetail from '../SingleItemDetail/SingleItemDetailScreen';
import styles from './styles';
import { storeCartToDisk } from '../../Core/cart/redux/reducers';
import { connect, useSelector } from 'react-redux';
import VendorAppConfig from './../../VendorAppConfig';

function SingleVendorScreen(props) {
  const { navigation, route } = props;
  const singleVendor = route.params.vendor;
  const singleCategory = route.params.category; // used only for single vendor config

  const emptyStateConfig = {
    title: IMLocalized('No Items'),
    description: IMLocalized(
      "Il n'y a encore aucun article en ligne chez ce commercant. Veuillez attendre que le vendeur remplisse son profil.",
    ),
  };

  const [data, setData] = useState([]);
  const [refreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vendor] = useState(singleVendor);
  const [category] = useState(singleCategory);
  const [dataSource, setDataSource] = useState([]);
  const [scrollToIndex, setScrollToIndex] = useState(0);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [ref1, setRef1] = useState(null);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartVendor = useSelector((state) => state.cart.vendor);

  // const ref = useRef(null);

  const ref = VendorAppConfig.isMultiVendorEnabled
    ? useRef(
        firebase
          .firestore()
          .collection(VendorAppConfig.tables.VENDOR_PRODUCTS)
          .where('vendorID', '==', vendor.id),
      )
    : useRef(
        firebase
          .firestore()
          .collection(VendorAppConfig.tables.VENDOR_PRODUCTS)
          .where('categoryID', '==', category?.id),
      );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: vendor?.title || category?.title,
      headerRight: () => <View />,
    });

    if (VendorAppConfig.isMultiVendorEnabled) {
      navigation.setOptions({
        headerRight: () => (
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ReservationScreen', {
                  vendor: vendor,
                  appConfig: VendorAppConfig,
                })
              }>
              <Image
                style={styles.icon}
                source={require('../../../assets/icons/reservation.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Reviews', {
                  entityID: vendor.id,
                  appStyles: DynamicAppStyles,
                  appConfig: VendorAppConfig,
                })
              }>
              <Image
                style={styles.icon}
                source={require('../../../assets/icons/review.png')}
              />
            </TouchableOpacity>
          </View>
        ),
      });
    }
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = ref.current.onSnapshot(onCollectionUpdate);

    return () => {
      unsubscribe();
    };
  }, [ref]);

  const onCollectionUpdate = (querySnapshot) => {
    const vendorProducts = [];
    querySnapshot.forEach((doc) => {
      vendorProducts.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setDataSource(vendorProducts);

    setData(vendorProducts);
    setLoading(false);
  };

  const onPress = (item) => {
    setSelectedItem(item);
    setIsVisible(true);
  };

  
  const renderCategoryItem = ({ item , index}) => (
    <TouchableOpacity onPress={() => scrollHandler(index)} style={{justifyContent: 'center', height: 70}}>
      <View style={{justifyContent: 'center',  backgroundColor: '#000', margin: 5, padding: 5, borderRadius: 50 }}>
        
        <Text style={{color: '#fff', fontWeight: 'bold', padding: 2}}>{item}</Text>
      </View>
    </TouchableOpacity>
  );
  const scrollHandler = (index) => {
    console.log(dataSourceCords.length, index);
    if (dataSourceCords.length > index) {
      ref1.scrollTo({
        x: 0,
        y: dataSourceCords[index - 1 ],
        animated: true,
      }
      );
    } else {
      alert('Out of Max Index');
    }
  };
 
  const renderByCategory = () => {
    const rows = [];
  let lastCategory = null;
  
  data.forEach((item, key) => {
    if (item.sub_category !== lastCategory && item.stock !== '') {
      rows.push(
        <Text style={styles.subCategory}>{item.sub_category} :</Text>
      );
    }
    if(item.stock !== ''){
      rows.push(
        <TouchableOpacity 
        onPress={() => onPress(item)}
        key={key}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          dataSourceCords[key] = layout.y;
          setDataSourceCords(dataSourceCords);
         
        }}
       onPress={() => onPress(item)} style={styles.itemContainer}>
            <View
           
            style={styles.subtitleView}
            >
              {/* <Text style={styles.subCategory}>{item.sub_category} :</Text> */}
    
              <Text style={styles.title}>{item.name}</Text>
    
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
         
            <Image style={styles.rightIcon} source={{ uri: item.photo }} />
            </TouchableOpacity>
      );
    }
    
  
      lastCategory = item.sub_category
    
  });
  return rows;

  }
  const filterCategory = () => {
    const categoryList = [];
  let lastCategory = null;
  
  data.forEach((item, key) => {
    console.log(item.sub_category, lastCategory)
    if (item.sub_category !== lastCategory && item.stock !== '') {
      categoryList.push(
       item.sub_category
      );
    }
      lastCategory = item.sub_category
   
  })
  // console.log(categoryList)
  return categoryList;

}
 
  return (
    <View style={styles.container}>
      {data.length === 0 && !loading && (
        <View style={styles.emptyViewContainer}>
          <TNEmptyStateView
            emptyStateConfig={emptyStateConfig}
            appStyles={DynamicAppStyles}
          />
        </View>
      )}
      <Modal
        style={styles.modalContainer}
        swipeDirection="down"
        onModalHide={async () => storeCartToDisk(cartItems, cartVendor)}
        onSwipeComplete={() => setIsVisible(false)}
        isVisible={isVisible}>
        <SingleItemDetail
          close={() => setIsVisible(false)}
          vendor={vendor}
          foodItem={selectedItem}
        />
      </Modal>
     
      <FlatList
        horizontal
        data={filterCategory()}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => `${item.id}`}
        initialNumToRender={5}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
      />
       <ScrollView
          ref={(ref) => {
            setRef1(ref);
          }}>
         {renderByCategory()}
        </ScrollView>
      {/* <FlatList
       ref={(ref) => {
        setRef1(ref);
      }}
        data={data}
        renderItem={ItemView}
        keyExtractor={(item) => `${item.id}`}
        initialNumToRender={5}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
      /> */}
    </View>
  );
}

SingleVendorScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

export default SingleVendorScreen;
