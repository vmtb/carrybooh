import { IMLocalized, setI18nConfig } from './Core/localization/IMLocalization';
import DynamicAppStyles from './DynamicAppStyles';

setI18nConfig();

const regexForNames = /^[a-zA-Z]{2,25}$/;
const regexForPhoneNumber = /\d{9}$/;

const VendorAppConfig = {
  isMultiVendorEnabled: true,
  isSMSAuthEnabled: true,
  appIdentifier: 'rn-restaurant-android',
  isDelayedLoginEnabled: false,
  tables: {
    VENDOR: 'vendors',
    VENDOR_ORDERS: 'restaurant_orders',
    VENDOR_DELIVERIES: 'restaurant_deliveries',
    VENDOR_REVIEWS: 'vendor_reviews',
    VENDOR_PRODUCTS: 'vendor_products',
    RESERVATIONS: 'reservations',
  },
  onboardingConfig: {
    welcomeTitle: IMLocalized('Welcome to Carrybooh'),
    welcomeCaption: IMLocalized(
      'Commandez chez les commerçants autour de vous et suivez vos commandes en temps réel.',
    ),
    walkthroughScreens: [
      {
        icon: require('../assets/icons/restaurant-menu.png'),
        title: IMLocalized('Welcome to Carrybooh'),
        description: IMLocalized(
          'Connectez-vous et commandez rapidement chez les commerçants de votre ville !',
        ),
      },
      {
        icon: require('../assets/icons/delivery-icon.png'),
        title: IMLocalized('Commandez'),
        description: IMLocalized(
          "Un besoin, une envie ? Commandez en quelques clics dans vos commerces locaux et recevez votre commande en moins d'une heure !",
        ),
      },
      {
        icon: require('../assets/icons/calendar-grid-icon.png'),
        title: IMLocalized('Réservez'),
        description: IMLocalized(
          'Prenez rendez-vous chez vos commerces rapidement !',
        ),
      },
      {
        icon: require('../assets/icons/binoculars.png'),
        title: IMLocalized('Suivi de la livraison'),
        description: IMLocalized(
          'Suivez votre commande en temps réel grâce à une carte interactive.',
        ),
      },
      {
        icon: require('../assets/icons/apple.png'),
        title: IMLocalized('Paiements sécurisés'),
        description: IMLocalized(
          'Payez avec vos cartes de crédit, Apple Pay ou Android Pay, en un seul clic.',
        ),
      },
    ],
  },
  drawerMenuConfig: {
    adminDrawerConfig: {
      upperMenu: [
        {
          title: IMLocalized('ACCUEIL'),
          icon: DynamicAppStyles.iconSet.shop,
          navigationPath: 'Restaurants',
        },
        {
          title: IMLocalized('ORDERS'),
          icon: DynamicAppStyles.iconSet.delivery,
          navigationPath: 'AdminOrder',
        },
        {
          title: IMLocalized('LIVRAISON'),
          icon: DynamicAppStyles.iconSet.delivery,
          navigationPath: 'Map',
        },
      ],
      lowerMenu: [
        {
          title: IMLocalized('DÉCONNEXION'),
          icon: DynamicAppStyles.iconSet.shutdown,
          action: 'logout',
        },
      ],
    },
    vendorDrawerConfig: {
      upperMenu: [
        {
          title: IMLocalized('ACCUEIL'),
          icon: DynamicAppStyles.iconSet.shop,
          navigationPath: 'Home',
        },
        {
          title: IMLocalized('CATÉGORIES'),
          icon: DynamicAppStyles.iconSet.menu,
          navigationPath: 'CategoryList',
        },
        {
          title: IMLocalized('RECHERCHER'),
          icon: DynamicAppStyles.iconSet.search,
          navigationPath: 'Search',
        },
        {
          title: IMLocalized('PANIER'),
          icon: DynamicAppStyles.iconSet.cart,
          navigationPath: 'Cart',
        },
        {
          title: IMLocalized('RÉSERVATIONS'),
          icon: DynamicAppStyles.iconSet.reserve,
          navigationPath: 'ReservationHistoryScreen',
        },
        {
          title: IMLocalized('PROFILE'),
          icon: DynamicAppStyles.iconSet.profile,
          navigationPath: 'MyProfile',
        },
        {
          title: IMLocalized('COMMANDES'),
          icon: DynamicAppStyles.iconSet.delivery,
          navigationPath: 'OrderList',
        },
      ],
      lowerMenu: [
        {
          title: IMLocalized('DÉCONNEXION'),
          icon: DynamicAppStyles.iconSet.shutdown,
          action: 'logout',
        },
      ],
    },
    customerDrawerConfig: {
      upperMenu: [
        {
          title: IMLocalized('ACCUEIL'),
          icon: DynamicAppStyles.iconSet.shop,
          navigationPath: 'Home',
        },
        {
          title: IMLocalized('CATÉGORIES'),
          icon: DynamicAppStyles.iconSet.menu,
          navigationPath: 'CategoryList',
        },
        {
          title: IMLocalized('SEARCH'),
          icon: DynamicAppStyles.iconSet.search,
          navigationPath: 'Search',
        },
        {
          title: IMLocalized('CART'),
          icon: DynamicAppStyles.iconSet.cart,
          navigationPath: 'Cart',
        },
        {
          title: IMLocalized('PROFILE'),
          icon: DynamicAppStyles.iconSet.profile,
          navigationPath: 'MyProfile',
        },
        {
          title: IMLocalized('COMMANDES'),
          icon: DynamicAppStyles.iconSet.delivery,
          navigationPath: 'OrderList',
        },
      ],
      lowerMenu: [
        {
          title: IMLocalized('DÉCONNEXION'),
          icon: DynamicAppStyles.iconSet.shutdown,
          action: 'logout',
        },
      ],
    },
    vendorDrawer: {
      upperMenu: [
        {
          title: IMLocalized('MANAGE ORDERS'),
          icon: DynamicAppStyles.iconSet.shop,
          navigationPath: 'Home',
        },
        {
          title: IMLocalized('MANAGE PRODUCTS'),
          icon: DynamicAppStyles.iconSet.foods,
          navigationPath: 'Products',
        },
      ],
      lowerMenu: [
        {
          title: IMLocalized('DÉCONNEXION'),
          icon: DynamicAppStyles.iconSet.shutdown,
          action: 'logout',
        },
      ],
    },
    driverDrawerConfig: {
      upperMenu: [
        {
          title: IMLocalized('ACCUEIL'),
          icon: DynamicAppStyles.iconSet.shop,
          navigationPath: 'Home',
        },
        {
          title: IMLocalized('COMMANDES'),
          icon: DynamicAppStyles.iconSet.delivery,
          navigationPath: 'OrderList',
        },
        {
          title: IMLocalized('PROFILE'),
          icon: DynamicAppStyles.iconSet.profile,
          navigationPath: 'MyProfile',
        },
      ],
      lowerMenu: [
        {
          title: IMLocalized('DÉCONNEXION'),
          icon: DynamicAppStyles.iconSet.shutdown,
          action: 'logout',
        },
      ],
    }
  },
  tosLink: 'https://www.instamobile.io/eula-instachatty/',
  editProfileFields: {
    sections: [
      {
        title: IMLocalized('PUBLIC PROFILE'),
        fields: [
          {
            displayName: IMLocalized('First Name'),
            type: 'text',
            editable: true,
            regex: regexForNames,
            key: 'firstName',
            placeholder: 'Your first name',
          },
          {
            displayName: IMLocalized('Last Name'),
            type: 'text',
            editable: true,
            regex: regexForNames,
            key: 'lastName',
            placeholder: 'Your last name',
          },
        ],
      },
      {
        title: IMLocalized('PRIVATE DETAILS'),
        fields: [
          {
            displayName: IMLocalized('E-mail Address'),
            type: 'text',
            editable: false,
            key: 'email',
            placeholder: 'Your email address',
          },
          {
            displayName: IMLocalized('Phone Number'),
            type: 'text',
            editable: true,
            regex: regexForPhoneNumber,
            key: 'phone',
            placeholder: 'Your phone number',
          },
        ],
      },
    ],
  },
  userSettingsFields: {
    sections: [
      {
        title: IMLocalized('SECURITY'),
        fields: [
          {
            displayName: IMLocalized('Allow Push Notifications'),
            type: 'switch',
            editable: true,
            key: 'push_notifications_enabled',
            value: true,
          },
          {...Platform.OS === 'ios' ? 
            {
              displayName: IMLocalized('Enable Face ID / Touch ID'),
              type: 'switch',
              editable: true,
              key: 'face_id_enabled',
              value: false,
            }: {}
          },
        ],
      },
      {
        title: IMLocalized('PUSH NOTIFICATIONS'),
        fields: [
          {
            displayName: IMLocalized('Order updates'),
            type: 'switch',
            editable: true,
            key: 'order_updates',
            value: false,
          },
          {
            displayName: IMLocalized('New arrivals'),
            type: 'switch',
            editable: false,
            key: 'new_arrivals',
            value: false,
          },
          {
            displayName: IMLocalized('Promotions'),
            type: 'switch',
            editable: false,
            key: 'promotions',
            value: false,
          },
        ],
      },
      {
        title: IMLocalized('ACCOUNT'),
        fields: [
          {
            displayName: IMLocalized('Save'),
            type: 'button',
            key: 'savebutton',
          },
        ],
      },
    ],
  },
  contactUsFields: {
    sections: [
      {
        title: IMLocalized('CONTACT'),
        fields: [
          {
            displayName: IMLocalized('Address'),
            type: 'text',
            editable: false,
            key: 'contacus',
            value: '142 Steiner Street, San Francisco, CA, 94115',
          },
          {
            displayName: IMLocalized('E-mail us'),
            value: 'florian@instamobile.io',
            type: 'text',
            editable: false,
            key: 'email',
            placeholder: 'Your email address',
          },
        ],
      },
      {
        title: '',
        fields: [
          {
            displayName: IMLocalized('Call Us'),
            type: 'button',
            key: 'savebutton',
          },
        ],
      },
    ],
  },
  contactUsPhoneNumber: '+16504859694',
  APIs: {
    firebase: 'firebase',
  },
  API_TO_USE: 'firebase', // "firebase", "wooCommerce", "shopify",
  stripeEnv: {
    API: {
      baseURL: 'https://murmuring-caverns-94283.herokuapp.com/', //your copied heroku link
      timeout: 30000,
    },
  },
  STRIPE_CONFIG: {
    PUBLISHABLE_KEY: 'pk_test_LSo5mTIQqkRiTWd0eBMSDAXf00QZGCttt3', // "pk_test_..." in test mode and ""pk_live_..."" in live mode
    MERCHANT_ID: 'Your_merchant_id_goes_here',
    ANDROID_PAYMENT_MODE: 'test', // test || production
  },
  GOOGLE_SIGNIN_CONFIG: {
    SCOPES: ['https://www.googleapis.com/auth/drive.photos.readonly'],
    WEB_CLIENT_ID:
      '706061484183-l0l58dds4kg329fh1trbiha1ci5rqm5n.apps.googleusercontent.com', // from google-services.json file
    OFFLINE_ACCESS: true,
  },
  FIREBASE_COLLECTIONS: {
    USERS: 'users',
    PAYMENT_METHODS: 'payment_methods',
    STRIPE_CUSTOMERS: 'stripe_customers',
    CATEGORIES: 'vendor_categories',
    CHARGES: 'charges',
    ORDERS: 'restaurant_orders',
    SOURCES: 'sources',
    PRODUCTS: 'vendor_products',
    SHIPPING_METHODS: 'shipping_methods',
  },
};

export default VendorAppConfig;
