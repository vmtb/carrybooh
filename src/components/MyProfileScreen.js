import React, {Component} from 'react';
import {BackHandler, View} from 'react-native';
import {connect} from 'react-redux';
import {AppIcon} from '../AppStyles';
import authManager from '../Core/onboarding/utils/authManager';
import DynamicAppStyles from '../DynamicAppStyles';
import VendorAppConfig from '../VendorAppConfig';
import {IMUserProfileComponent} from '../Core/profile';
import {logout, setUserData} from '../Core/onboarding/redux/auth';
import {IMLocalized} from '../Core/localization/IMLocalization';
import Hamburger from './Hamburger/Hamburger';
import {Appearance} from 'react-native-appearance';

class MyProfileScreen extends Component {
  constructor(props) {
    super(props);
    const {navigation} = props;
    const colorScheme = Appearance.getColorScheme();
    let currentTheme = DynamicAppStyles.navThemeConstants[colorScheme];
    navigation.setOptions({
      title: IMLocalized('My Profile'),
      headerTintColor: currentTheme.activeTintColor,
      headerTitleStyle: {color: currentTheme.fontColor},
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
      },
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });

    this.didFocusSubscription = props.navigation.addListener(
      'focus',
      payload =>
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
  }

  componentDidMount() {
    this.willBlurSubscription = this.props.navigation.addListener(
      'blur',
      payload =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
  }

  componentWillUnmount() {
    this.didFocusSubscription && this.didFocusSubscription();
    this.willBlurSubscription && this.willBlurSubscription();
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();

    return true;
  };

  onLogout() {
    authManager.logout(this.props.user);
    this.props.logout();
    this.props.navigation.navigate('LoadScreen', {
      appStyles: DynamicAppStyles,
      appConfig: VendorAppConfig,
    });
  }

  onUpdateUser = newUser => {
    this.props.setUserData({user: newUser});
  };

  render() {
    var menuItems = [
      {
        title: IMLocalized('Account Details'),
        icon: AppIcon.images.accountDetail,
        tintColor: '#6b7be8',
        onPress: () =>
          this.props.navigation.navigate('AccountDetail', {
            appStyles: DynamicAppStyles,
            form: VendorAppConfig.editProfileFields,
            screenTitle: IMLocalized('Edit Profile'),
          }),
      },
      {
        title: IMLocalized('Favorite Restaurants'),
        icon: AppIcon.images.favoriteRestaurant,
        tintColor: '#ff726f',
        onPress: () => {
          console.log('Favourite Restaurants');
        },
      },
      {
        title: IMLocalized('Order History'),
        icon: AppIcon.images.delivery,
        tintColor: '#272700',
        onPress: () => this.props.navigation.navigate('OrderList'),
      },
      {
        title: IMLocalized('Settings'),
        icon: AppIcon.images.settings,
        tintColor: '#a6a4b1',
        onPress: () =>
          this.props.navigation.navigate('Settings', {
            appStyles: DynamicAppStyles,
            form: VendorAppConfig.userSettingsFields,
            screenTitle: IMLocalized('Settings'),
          }),
      },
      {
        title: IMLocalized('Contact Us'),
        icon: AppIcon.images.contactUs,
        tintColor: '#9ee19f',
        onPress: () =>
          this.props.navigation.navigate('Contact', {
            appStyles: DynamicAppStyles,
            form: VendorAppConfig.contactUsFields,
            screenTitle: IMLocalized('Contact us'),
          }),
      },
    ];

    if (this.props.isAdmin) {
      menuItems.push({
        title: IMLocalized('Admin Dashboard'),
        tintColor: '#8aced8',
        icon: AppIcon.images.checklist,
        onPress: () => this.props.navigation.navigate('AdminDashboard'),
      });
    }

    return (
      <IMUserProfileComponent
        user={this.props.user}
        onUpdateUser={user => this.onUpdateUser(user)}
        onLogout={() => this.onLogout()}
        menuItems={menuItems}
        appStyles={DynamicAppStyles}
      />
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {
    user: auth.user,
    isAdmin: auth.user && auth.user.isAdmin,
  };
};

export default connect(mapStateToProps, {
  logout,
  setUserData,
})(MyProfileScreen);
