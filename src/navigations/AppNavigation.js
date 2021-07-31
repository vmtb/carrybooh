import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ShoppingCartButton from '../components/ShoppingCartButton/ShoppingCartButton';
import CartScreen from '../Core/cart/ui/Cart/IMCartScreen';
import CategoryListScreen from '../screens/CategoryList/CategoryListScreen';

import IMDrawerMenu from '../Core/ui/drawer/IMDrawerMenu/IMDrawerMenu'

import SingleItemDetail from '../screens/SingleItemDetail/SingleItemDetailScreen';
import SingleVendorScreen from '../screens/SingleVendor/SingleVendorScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import OrderListScreen from '../screens/OrderList/OrderListScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import LoginScreen from '../Core/onboarding/LoginScreen/LoginScreen';
import SignupScreen from '../Core/onboarding/SignupScreen/SignupScreen';
import WelcomeScreen from '../Core/onboarding/WelcomeScreen/WelcomeScreen';
import WalkthroughScreen from '../Core/onboarding/WalkthroughScreen/WalkthroughScreen';
import LoadScreen from '../Core/onboarding/LoadScreen/LoadScreen';
import SmsAuthenticationScreen from '../Core/onboarding/SmsAuthenticationScreen/SmsAuthenticationScreen';
import ResetPasswordScreen from '../Core/onboarding/ResetPasswordScreen/ResetPasswordScreen';
import DynamicAppStyles from '../DynamicAppStyles';
import AppConfig from '../VendorAppConfig';
import IMVendorsMap from '../Core/vendor/ui/IMVendorsMap/IMVendorsMap';
import AdminOrderListScreen from '../Core/vendor/admin/ui/AdminOrderList/AdminOrderListScreen';
import AdminVendorListScreen from '../Core/vendor/admin/ui/AdminVendorList/AdminVendorListScreen';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import CheckoutScreen from '../Core/cart/ui/IMCheckoutScreen';
import CardScreen from '../Core/payment/ui/Card/IMCardScreen';
import MyProfileScreen from '../components/MyProfileScreen';
import {
  IMEditProfileScreen,
  IMUserSettingsScreen,
  IMContactUsScreen,
} from '../Core/profile';
import IMVendorReview from '../Core/review/ui/IMVendorReviewScreen/IMVendorReviewScreen';
import stripe from 'tipsi-stripe';
import FastImage from 'react-native-fast-image';
import IMOrderTrackingScreen from '../Core/delivery/IMOrderTrackingScreen/IMOrderTrackingScreen';
import IMAddAddressModal from '../Core/payment/component/IMAddAddressModal/IMAddAddressModal';
import { IMChatScreen } from '../Core/chat';

import ReservationScreen from '../screens/Reservation/ReservationScreen';
import ReservationHistoryScreen from '../screens/ReservationHistory/ReservationHistoryScreen';

import VendorHomeScreen from '../vendorapp/screens/Home/HomeScreen';
import VendorProductsScreen from '../vendorapp/screens/ProductList/ProductListScreen';

import DriverHomeScreen from '../driverapp/screens/Home/HomeScreen';
import DriverOrdersScreen from '../driverapp/screens/Orders/OrdersScreen';
import { useColorScheme } from 'react-native-appearance';
import { NavigationContainer } from '@react-navigation/native';
import { IMCategoryVendorsScreen } from '../Core/vendor/ui/IMVendors/IMCategoryVendors/IMCategoryVendorsScreen';
import { IMLocalized } from '../Core/localization/IMLocalization';
import { useSelector } from 'react-redux';
import authManager from '../Core/onboarding/utils/authManager';
import DriverAppConfig from '../driverapp/DriverAppConfig';

stripe.setOptions({
  publishableKey: AppConfig.STRIPE_CONFIG.PUBLISHABLE_KEY,
  merchantId: AppConfig.STRIPE_CONFIG.MERCHANT_ID,
  androidPayMode: AppConfig.STRIPE_CONFIG.ANDROID_PAYMENT_MODE,
});

const Main = createStackNavigator();
const MainNavigation = () => {
  const colorScheme = useColorScheme();
  return (
    <Main.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleStyle: {
          fontFamily: 'FallingSkyCond',
        },
        headerStyle: {
          backgroundColor:
            DynamicAppStyles.navThemeConstants[colorScheme].backgroundColor,
        },
        headerTintColor: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
        headerRight: () => (
          <View style={styles.headerRight}>
            {AppConfig.isMultiVendorEnabled && (
              <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                <FastImage
                  source={require('../../assets/icons/map.png')}
                  style={styles.mapImage}
                  tintColor={
                    DynamicAppStyles.navThemeConstants[colorScheme]
                      .activeTintColor
                  }
                />
              </TouchableOpacity>
            )}
            <ShoppingCartButton
              onPress={() => {
                navigation.navigate('Cart', {
                  appStyles: DynamicAppStyles,
                  appConfig: AppConfig,
                });
              }}
            />
          </View>
        ),
      })}
      initialRouteName="Home"
      headerMode="float">
      <Main.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: AppConfig,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Main.Screen name="Cart" component={CartScreen} />
      <Main.Screen name="OrderList" component={OrderListScreen} />
      <Main.Screen name="Search" component={SearchScreen} />
      <Main.Screen name="SingleVendor" component={SingleVendorScreen} />
      <Main.Screen name="SingleItemDetail" component={SingleItemDetail} />
      <Main.Screen name="CategoryList" component={CategoryListScreen} />
      <Main.Screen name="Map" component={IMVendorsMap} />
      <Main.Screen name="Restaurants" component={AdminVendorListScreen} />
      <Main.Screen name="AdminOrder" component={AdminOrderListScreen} />
      <Main.Screen name="Checkout" component={CheckoutScreen} />
      <Main.Screen name="Cards" component={CardScreen} />
      <Main.Screen name="Reviews" component={IMVendorReview} />
      <Main.Screen name="MyProfile" component={MyProfileScreen} />
      <Main.Screen
        options={{ headerRight: () => <View /> }}
        name={IMLocalized('Contact')}
        component={IMContactUsScreen}
      />
      <Main.Screen
        options={{ headerRight: () => <View /> }}
        name={IMLocalized('Settings')}
        component={IMUserSettingsScreen}
      />
      <Main.Screen name="AccountDetail" component={IMEditProfileScreen} />
      <Main.Screen name="Vendor" component={IMCategoryVendorsScreen} />
      <Main.Screen
        name="OrderTrackingScreen"
        component={IMOrderTrackingScreen}
      />
      <Main.Screen name="AddAddress" component={IMAddAddressModal} />
      <Main.Screen name="PersonalChat" component={IMChatScreen} />
      <Main.Screen name="ReservationScreen" component={ReservationScreen} />
      <Main.Screen
        name="ReservationHistoryScreen"
        component={ReservationHistoryScreen}
      />
    </Main.Navigator>
  );
};
const Drawer = createDrawerNavigator();
const DrawerStack = (props) => {
  const drawer = ( AppConfig.isMultiVendorEnabled ?
                    <IMDrawerMenu
                          navigation={props.navigation}
                          menuItems={AppConfig.drawerMenuConfig.vendorDrawerConfig.upperMenu}
                          menuItemsSettings={AppConfig.drawerMenuConfig.vendorDrawerConfig.lowerMenu}
                          appStyles={DynamicAppStyles}
                          authManager={authManager}
                          appConfig={AppConfig}
                        />
                    : <IMDrawerMenu
                          navigation={props.navigation}
                          menuItems={AppConfig.drawerMenuConfig.customerDrawerConfig.upperMenu}
                          menuItemsSettings={AppConfig.drawerMenuConfig.customerDrawerConfig.lowerMenu}
                          appStyles={DynamicAppStyles}
                          authManager={authManager}
                          appConfig={AppConfig}
                        />
  );
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerStyle={{ width: 250 }}
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => (
        drawer
      )}>
      <Drawer.Screen name="Main" component={MainNavigation} />
    </Drawer.Navigator>
  );
};

const AdminDrawer = createDrawerNavigator();
const AdminDrawerStack = (props) => {
  return (
    <AdminDrawer.Navigator
      drawerPosition="left"
      drawerStyle={{ width: 250 }}
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => (
        <IMDrawerMenu
          navigation={props.navigation}
          menuItems={AppConfig.drawerMenuConfig.adminDrawerConfig.upperMenu}
          menuItemsSettings={AppConfig.drawerMenuConfig.adminDrawerConfig.lowerMenu}
          appStyles={DynamicAppStyles}
          authManager={authManager}
          appConfig={AppConfig}
        />
      )}>
      <AdminDrawer.Screen name="Main" component={MainNavigation} />
    </AdminDrawer.Navigator>
  );
};

const Login = createStackNavigator();
const LoginStack = () => {
  return (
    <Login.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome">
      <Login.Screen name="Login" component={LoginScreen} />
      <Login.Screen name="Signup" component={SignupScreen} />
      <Login.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: AppConfig,
          authManager: authManager
        }}
        name="Welcome"
        component={WelcomeScreen}
      />
      <Login.Screen name="Sms" component={SmsAuthenticationScreen} />
      <Login.Screen name="ResetPassword"
        component={ResetPasswordScreen}
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: AppConfig,
          authManager: authManager
        }}
      />
    </Login.Navigator>
  );
};

const VendorMain = createStackNavigator();
const VendorMainNavigation = () => {
  const colorScheme = useColorScheme();
  return (
    <VendorMain.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor:
            DynamicAppStyles.navThemeConstants[colorScheme].backgroundColor,
        },
        headerTitleAlign: 'center',
        headerTintColor: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
      })}
      initialRouteName="Home"
      headerMode="float">
      <VendorMain.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: AppConfig,
        }}
        name="Home"
        component={VendorHomeScreen}
      />
      <VendorMain.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: AppConfig,
        }}
        name="Products"
        component={VendorProductsScreen}
      />
    </VendorMain.Navigator>
  );
};

const VendorDrawer = createDrawerNavigator();
const VendorDrawerStack = () => {
  return (
    <VendorDrawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerStyle={{ width: 250 }}
      drawerPosition="left"
      drawerContent={({ navigation }) => (
        <IMDrawerMenu
            navigation={navigation}
            menuItems={AppConfig.drawerMenuConfig.vendorDrawer.upperMenu}
            menuItemsSettings={AppConfig.drawerMenuConfig.vendorDrawer.lowerMenu}
            appStyles={DynamicAppStyles}
            authManager={authManager}
            appConfig={AppConfig}
          /> 
      )}>
      <VendorDrawer.Screen name="Main" component={VendorMainNavigation} />
    </VendorDrawer.Navigator>
  );
};

const DriverMain = createStackNavigator();
const DriverMainNavigation = () => {
  const colorScheme = useColorScheme();
  return (
    <DriverMain.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor:
            DynamicAppStyles.navThemeConstants[colorScheme].backgroundColor,
        },
        headerTitleAlign: 'center',
        headerTintColor: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
      })}
      initialRouteName="Home"
      headerMode="float">
      <DriverMain.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: AppConfig,
        }}
        name="Home"
        component={DriverHomeScreen}
      />
      <DriverMain.Screen name="MyProfile" component={MyProfileScreen} />
      <DriverMain.Screen name="OrderList" component={DriverOrdersScreen} />
      <DriverMain.Screen name="Contact" component={IMContactUsScreen} />
      <DriverMain.Screen name="Settings" component={IMUserSettingsScreen} />
      <DriverMain.Screen name="AccountDetail" component={IMEditProfileScreen} />
      <DriverMain.Screen name="PersonalChat" component={IMChatScreen} />
    </DriverMain.Navigator>
  );
};

const DriverDrawer = createDrawerNavigator();
const DriverDrawerStack = () => {
  return (
    <DriverDrawer.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => (
        <IMDrawerMenu
          navigation={navigation}
          menuItems={AppConfig.drawerMenuConfig.driverDrawerConfig.upperMenu}
          menuItemsSettings={AppConfig.drawerMenuConfig.driverDrawerConfig.lowerMenu}
          appStyles={DynamicAppStyles}
          authManager={authManager}
          appConfig={DriverAppConfig}
        /> 
      )}
      drawerPosition="left"
      drawerStyle={{ width: 250 }}>
      <DriverDrawer.Screen name="Main" component={DriverMainNavigation} />
    </DriverDrawer.Navigator>
  );
};
const RootStack = createStackNavigator();
const RootNavigator = () => {
  const currentUser = useSelector((state) => state.auth.user);
  console.log(currentUser.role);
  return (
    <RootStack.Navigator
      initialRouteName="LoadScreen"
      screenOptions={{ headerShown: false, animationEnabled: false }}
      headerMode="none">
      <RootStack.Screen
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: AppConfig,
          authManager: authManager
        }}
        options={{ headerShown: false }}
        name="LoadScreen"
        component={LoadScreen}
      />
      <RootStack.Screen
        options={{ headerShown: false }}
        name="Walkthrough"
        component={WalkthroughScreen}
        initialParams={{
          appStyles: DynamicAppStyles,
          appConfig: AppConfig
        }}
      />
      <RootStack.Screen
        options={{ headerShown: false }}
        name="LoginStack"
        component={LoginStack}
      />
      {currentUser?.role === 'vendor' ? (
        <RootStack.Screen
          options={{ headerShown: false }}
          name="MainStack"
          component={VendorDrawerStack}
        />
      ) : currentUser?.role === 'driver' ? (
        <RootStack.Screen
          options={{ headerShown: false }}
          name="MainStack"
          component={DriverDrawerStack}
        />
      ) : currentUser?.role === 'admin' ? (
        <RootStack.Screen
          options={{ headerShown: false }}
          name="MainStack"
          component={AdminDrawerStack}
        />
      ) : (
        <RootStack.Screen
          options={{ headerShown: false }}
          name="MainStack"
          component={DrawerStack}
        />
      )}
    </RootStack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export { RootNavigator, AppNavigator };

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapImage: { width: 25, height: 25 },
});
