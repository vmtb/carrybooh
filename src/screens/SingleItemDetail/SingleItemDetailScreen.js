import React from 'react';
import {FlatList, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import Button from 'react-native-button';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './styles';
import DynamicAppStyles from '../../DynamicAppStyles';
import {
  addToCart,
  updateCart,
  setCartVendor,
} from '../../Core/cart/redux/actions';
import {Appearance} from 'react-native-appearance';
import {firebase} from '../../Core/firebase/config';
import {IMLocalized} from '../../Core/localization/IMLocalization';
import {storeCartToDisk} from '../../Core/cart/redux/reducers';

class SingleItemDetail extends React.Component {
  constructor(props) {
    super(props);
    const {foodItem} = props;
    this.colorScheme = Appearance.getColorScheme();
    const item = foodItem; // navigation.getParam('item');

    this.ref = firebase
      .firestore()
      .collection('vendor_products')
      .doc(item.id);

    this.state = {
      product: {},
      quantity: 1,
      photo: item.photo,
      loading: true,
      itemAlreadyInCart: {},
      indexAlreadyInCart: -1,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onDocUpdate);
    this.checkAlreadyAdded();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onDocUpdate = doc => {
    this.setState({
      product: doc.data(),
    });
  };

  onIncrease = () => {
    let stock = parseInt(this.state.product.stock);

    if(this.state.quantity < stock){
      this.setState(prevState => ({quantity: prevState.quantity + 1}));
    }
  };

  onDecrease = () => {
    if (this.state.quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}));
    }
  };

  onAddToCart = () => {
    if (this.state.indexAlreadyInCart !== -1) {
      let tempCart = this.state.itemAlreadyInCart;
      tempCart.quantity = this.state.quantity + tempCart.quantity;
      this.props.updateCart(tempCart, this.state.added);
      this.props.setCartVendor(this.props.vendor);
      storeCartToDisk(this.props.cartItems, this.props.vendor);
      this.props.close();
      return;
    }
    const item = {...this.state.product, quantity: this.state.quantity};
    const len = this.props.cartItems.length;
    if (
      this.props.cartItems.length !== 0 &&
      this.props.cartItems[len - 1].vendorID !== item.vendorID
    ) {
      // eslint-disable-next-line no-alert
      alert(
        IMLocalized(
          "Vous ne pouvez pas encore commander en une seule fois dans des commerces différents. Veuillez d'abord retirer tous les autres articles du panier.",
        ),
      );
      return;
    }
    this.props.addToCart(item);
    this.props.setCartVendor(this.props.vendor);
    storeCartToDisk(this.props.cartItems, this.props.vendor);
    this.props.close();
  };

  onPressItem = item => {
    this.setState({photo: item});
  };

  renderItem = ({item}) => (
    <TouchableOpacity onPress={() => this.onPressItem(item)}>
      <FastImage
        style={styles.detail}
        placeholderColor={DynamicAppStyles.colorSet[this.colorScheme].grey9}
        source={{uri: item}}
      />
    </TouchableOpacity>
  );

  checkAlreadyAdded = () => {
    let {cartItems, foodItem} = this.props;
    const added = cartItems.findIndex(
      singleCartItem => singleCartItem.id === foodItem.id,
    );
    if (added !== -1) {
      this.setState({itemAlreadyInCart: cartItems[added]});
      this.setState({indexAlreadyInCart: added});
    } else {
      this.setState({indexAlreadyInCart: added});
    }
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          width: 10,
          height: '100%',
        }}
      />
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
       <View style={styles.headerContainer}> 
        <Text style={styles.title}> {this.state.product.name} </Text>
        <Button
              containerStyle={styles.modalCloseButtonContainer}
              style={styles.modalClosebuttonButtonText}
              onPress={this.props.close}>
              X
            </Button>
      </View>
        <FastImage
          source={{
            uri: this.state.photo,
          }}
          style={styles.photo}
        />
        <View style={styles.detailPhotos}>
          <FlatList
            style={styles.flat}
            horizontal
            ItemSeparatorComponent={this.renderSeparator}
            data={this.state.product.photos}
            renderItem={this.renderItem}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => `${item}`}
          />
        </View>
        <Text style={styles.description}>
          {' '}
          {this.state.product.description}{' '}
        </Text>
        <View style={styles.buttonSetContainer}>
          <View style={styles.buttonSet}>
            <Button
              containerStyle={styles.buttonContainer}
              style={styles.buttonText}
              onPress={this.onDecrease}>
              -
            </Button>
            <Text style={styles.count}>{this.state.quantity}</Text>
            <Button
              containerStyle={styles.buttonContainer}
              style={styles.buttonText}
              onPress={this.onIncrease}>
              +
            </Button>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <Text style={styles.price}>
            ${(this.state.product.price * this.state.quantity).toFixed(2)}
          </Text>

          <Button
            containerStyle={styles.actionButtonContainer}
            style={styles.actionButtonText}
            onPress={this.onAddToCart}>
            {IMLocalized('Add to Cart')}
          </Button>
        </View>
      </ScrollView>
    );
  }
}

SingleItemDetail.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
  foodItem: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps, {addToCart, updateCart, setCartVendor})(
  SingleItemDetail,
);
