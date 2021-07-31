import React, { Component } from 'react';
import { FlatList, Text, View, TouchableWithoutFeedback } from 'react-native';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dynamicStyles from './styles';
import Hamburger from '../../../../components/Hamburger/Hamburger';
import { removeFromCart, overrideCart, updateCart } from '../../redux/actions';
import { IMLocalized } from '../../../localization/IMLocalization';
import { TNEmptyStateView } from '../../../truly-native';
import EditCartModal from '../../components/EditCartModal/IMEditCartModal';
import { storeCartToDisk } from '../../redux/reducers';

class CartScreen extends Component {
  constructor(props) {
    super(props);

    props.navigation.setOptions({
      title: IMLocalized('Your Cart'),
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            props.navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });

    this.state = {
      item: {},
      isVisible: false,
      id: 0,
      placeOrderVisible: false,
    };
  }

  renderFooter = () => {
    const { navigation, route } = this.props;
    const appStyles = route.params.appStyles;
    const styles = dynamicStyles(appStyles);
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>{IMLocalized('Total')}</Text>
          <Text style={styles.price}>
            $
            {this.props.cartItems
              .reduce((prev, next) => prev + next.price * next.quantity, 0)
              .toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };

  onItemPress = (item, id) => {
    this.setState({ id });
    this.setState({ item });
    this.setState({ isVisible: true });
  };

  onPress = () => {
    const { navigation, route } = this.props;
    const appStyles = route.params.appStyles;
    const appConfig = route.params.appConfig;
    navigation.navigate('AddAddress', { appStyles, appConfig });
  };

  renderItem = ({ item }) => {
    const { navigation, route } = this.props;
    const appStyles = route.params.appStyles;
    const styles = dynamicStyles(appStyles);
    return (
      <TouchableWithoutFeedback
        onPress={() => this.onItemPress(item)}
        style={styles.container}>
        <View style={styles.rowContainer} key={item.id}>
          <Text style={styles.count}>{item.quantity}</Text>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const { item, isVisible, id } = this.state;
    const { route } = this.props;
    const appStyles = route.params.appStyles;
    const styles = dynamicStyles(appStyles);
    const emptyStateConfig = {
      title: IMLocalized('Empty Cart'),
      description: IMLocalized(
        'Votre panier est actuellement vide. Les produits que vous ajoutez à votre panier apparaîtront ici.',
      ),
    };

    return (
      <View style={styles.container}>
        <EditCartModal
          item={item}
          id={id}
          style={styles}
          appStyles={appStyles}
          close={() => this.setState({ isVisible: false })}
          deleteCart={() => {
            this.setState({ isVisible: false });
            this.props.removeFromCart(item);
          }}
          updateCart={(newCartItem, newCartid) =>
            this.props.updateCart(newCartItem, newCartid)
          }
          isVisible={isVisible}
          onModalHide={async () =>
            storeCartToDisk(this.props.cartItems, this.props.cartVendor)
          }
        />
        {this.props.cartItems.length > 0 && (
          <FlatList
            style={styles.flat}
            data={this.props.cartItems}
            renderItem={this.renderItem}
            keyExtractor={(singleCartItem) => `${singleCartItem.id}`}
            ListFooterComponent={this.renderFooter}
          />
        )}
        {this.props.cartItems.length === 0 && (
          <View style={styles.emptyViewContainer}>
            <TNEmptyStateView
              emptyStateConfig={emptyStateConfig}
              appStyles={appStyles}
            />
          </View>
        )}
        {this.props.cartItems.length > 0 && (
          <Button
            containerStyle={styles.actionButtonContainer}
            style={styles.actionButtonText}
            onPress={() => this.onPress()}>
            {IMLocalized('CHECKOUT')}
          </Button>
        )}
      </View>
    );
  }
}

CartScreen.propTypes = {
  user: PropTypes.shape(),
  cartItems: PropTypes.array,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  cartVendor: state.cart.vendor,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  removeFromCart,
  overrideCart,
  updateCart,
})(CartScreen);
