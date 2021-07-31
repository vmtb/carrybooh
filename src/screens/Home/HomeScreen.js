import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from 'react-redux';
import DynamicAppStyles from '../../DynamicAppStyles';
import styles from './styles';
import Hamburger from '../../components/Hamburger/Hamburger';
import {overrideCart, setCartVendor} from '../../Core/cart/redux/actions';
import {Appearance} from 'react-native-appearance';
import {firebase} from '../../Core/firebase/config';
import {IMLocalized} from '../../Core/localization/IMLocalization';
import IMVendorFilterModal from '../../components/FilterModal/FilterModal';
import { VENDOR, VENDOR_CATEGORIES } from '../../Configuration';
import { setVendors, setPopularProducts } from '../../Core/vendor/redux';
import ProductsAPIManager from '../../api/ProductsAPIManager';
import PopularProductsListView from './PopularProductsListView/PopularProductsListView';
import IMVendorListAPI from '../../Core/vendor/api/IMVendorListAPI';
import IMVendorsScreen from '../../Core/vendor/ui/IMVendors/IMVendorsScreen';
import VendorAppConfig from '../../VendorAppConfig';

const { width: viewportWidth } = Dimensions.get('window');

const HomeScreen = (props) => {
  const { navigation, route } = props;
  const appConfig = route.params.appConfig;
  const appStyles = route.params.appStyles;
  const dispatch = useDispatch();
  const colorScheme = Appearance.getColorScheme();
  const categoriesRef = useRef(firebase
    .firestore()
    .collection(VENDOR_CATEGORIES)
    .orderBy('order'));
  const dealsRef = useRef(firebase
    .firestore()
    .collection(VENDOR_CATEGORIES)
    .orderBy('order'));

  const [activeSlide, setActiveSlide] = useState(0);
  const [categories, setCategories] = useState([]);
  const [deals, setDeals] = useState([]);
  const [foods, setFoods] = useState([]);
  const [filters, setFilters] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const categorieUnsubscribe = useRef(null);
  const dealsUnsubscribe = useRef(null);
  const foodsUnsubscribe = useRef(null);
  const vendorAPIManager = useRef(null);
  const productsAPIManager = useRef(null);
  const slider1Ref = useRef(null);

  const vendors = useSelector((state) => state.vendor.vendors);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: IMLocalized('ACCUEIL'),
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
    if (VendorAppConfig.isMultiVendorEnabled) {
      vendorAPIManager.current = new IMVendorListAPI(async (vendors) => {
        dispatch(setVendors(vendors));
      }, VENDOR);
    } else {
      productsAPIManager.current = new ProductsAPIManager( async (products) => {
        dispatch(setPopularProducts(products));
      });
    }
  }, []);

  const navToMap = (vendors, navigation) => {
    if (vendors.length > 0 || vendors !== undefined) {
      navigation.navigate('Map', { vendors });
    }
  };

  useEffect(() => {
    initCartFromPersistentStore();
    categorieUnsubscribe.current = categoriesRef.current.onSnapshot(
      onCategoriesCollectionUpdate,
    );
    dealsUnsubscribe.current = dealsRef.current.onSnapshot(onDealsCollectionUpdate);

    return () => {
      categorieUnsubscribe.current && categorieUnsubscribe.current();
      dealsUnsubscribe.current && dealsUnsubscribe.current();

      if (VendorAppConfig.isMultiVendorEnabled) {
        vendorAPIManager?.current.unsubscribe && vendorAPIManager?.current.unsubscribe();
      } else {
        productsAPIManager?.current.unsubscribe && productsAPIManager?.current.unsubscribe();
      };
    };
  }, []);

  const onPressCategoryItem = (item) => {
    if (appConfig.isMultiVendorEnabled) {
      props.navigation.navigate('Vendor', {
        category: item,
        appStyles,
        appConfig,
      });
    } else {
      props.navigation.navigate('SingleVendor', { category: item });
    }
  };

  const onPressDealItem = (item) => {
    if (appConfig.isMultiVendorEnabled) {
      props.navigation.navigate('Vendor', {
        category: item,
        appStyles,
        appConfig,
      });
    } else {
      props.navigation.navigate('SingleVendor', { category: item });
    }
  };

  const onCategoriesCollectionUpdate = (querySnapshot) => {
    setCategories(querySnapshot.docs.map((doc) => doc.data()));
  };

  onDealsCollectionUpdate = (querySnapshot) => {
    setDeals(querySnapshot.docs.map((doc) => doc.data()));
    setSelectedItem({});
    setIsVisible(false);
  };

  const initCartFromPersistentStore = () => {
    AsyncStorage.getItem('@MySuperCart:key')
      .then((res) => {
        if (res != null) {
          const cart = JSON.parse(res);
          overrideCart(cart.cartItems);
          setCartVendor(cart.vendor);
        }
      })
      .catch((error) => {
        console.log(`Promise is rejected with error: ${error}`);
      });
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPressCategoryItem(item)}>
      <View style={styles.categoryItemContainer}>
        <FastImage
          placeholderColor={DynamicAppStyles.colorSet[colorScheme].grey9}
          style={styles.categoryItemPhoto}
          source={{ uri: item.photo }}
        />
        <Text style={styles.categoryItemTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderDealItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPressDealItem(item)}>
      <View style={styles.dealItemContainer}>
        <FastImage
          placeholderColor={DynamicAppStyles.colorSet[colorScheme].grey9}
          style={styles.dealPhoto}
          source={{ uri: item.photo }}
        />
        <View style={styles.overlay} />
        <Text style={styles.dealName}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategorySeparator = () => {
    return (
      <View
        style={{
          width: 10,
          height: '100%',
        }}
      />
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <IMVendorFilterModal
        isVisible={isVisible}
        filters={filters}
        close={() => setIsVisible(false)}
      />
      <Text style={styles.title}> {IMLocalized('Popular Categories')} </Text>
      <View style={styles.categories}>
        <FlatList
          horizontal
          initialNumToRender={4}
          data={categories}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
      <Text style={styles.title}> {IMLocalized('Best Deals')} </Text>
      <View style={styles.deals}>
        <View style={styles.carousel}>
          <Carousel
            ref={(c) => {
              slider1Ref.current = c;
            }}
            data={deals}
            renderItem={renderDealItem}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            // hasParallaxImages={true}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            firstItem={0}
            loop={false}
            // loopClonesPerSide={2}
            autoplay={false}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={(index) => setActiveSlide(index)}
          />
          <Pagination
            dotsLength={deals.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotColor="rgba(255, 255, 255, 0.92)"
            dotStyle={styles.paginationDot}
            inactiveDotColor="white"
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={slider1Ref}
            tappableDots={!!slider1Ref}
          />
        </View>
      </View>
      <View style={styles.mostPopular}>
        <Text style={styles.title}> {IMLocalized('Most Popular')} </Text>
        {appConfig.isMultiVendorEnabled ? (
          <IMVendorsScreen
            navigation={props.navigation}
            appConfig={VendorAppConfig}
            appStyles={DynamicAppStyles}
            route={route}
            vendors={vendors}
          />
        ) : (
          <PopularProductsListView />
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
