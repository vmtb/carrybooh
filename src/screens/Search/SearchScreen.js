import React, { Component, createRef } from 'react';
import { FlatList, Keyboard, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';
import { FoodListItemStyle } from '../../AppStyles';
import Hamburger from '../../components/Hamburger/Hamburger';
import { firebase } from '../../Core/firebase/config';
import Modal from 'react-native-modal';
import SingleItemDetail from '../SingleItemDetail/SingleItemDetailScreen';
import styles from './styles';
import { VENDOR_PRODUCTS } from '../../Configuration';
import FastImage from 'react-native-fast-image';
import DynamicAppStyles from '../../DynamicAppStyles';
import SearchBar from '../../Core/ui/SearchBar/SearchBar';
import { connect } from 'react-redux';
import { storeCartToDisk } from '../../Core/cart/redux/reducers';

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    const searchRef = createRef();

    navigation.setOptions({
      headerLeft: () => (
        <Hamburger
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerTitleContainerStyle: {
        justifyContent: 'flex-start',
      },
      headerTitle: () => (
        <SearchBar
          searchRef={searchRef}
          appStyles={DynamicAppStyles}
          onSearch={(text) => this.onSearch(text)}
          onChangeText={(text) => this.onSearch(text)}
          onSearchBarCancel={(text) => {
            searchRef.current.clearText();
            this.onSearch(text);
            Keyboard.dismiss();
          }}
        />
      ),
    });
    this.state = {
      // keyword: 'nadfaef',
      // loading: false,
      data: [],
      selectedItem: {},
      isVisible: false,
      vendor: null,
    };

    this.ref = firebase.firestore().collection(VENDOR_PRODUCTS);
    this.unsubscribe = null;
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      const { name } = doc.data();
      const text =
        this.searchedText != null ? this.searchedText.toLowerCase() : '';
      const index = name.toLowerCase().search(text);
      if (index !== -1) {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      }
    });

    this.setState({
      data,
      // loading: false,
    });
  };

  onSearch = (text) => {
    this.ref = firebase.firestore().collection(VENDOR_PRODUCTS);
    this.searchedText = text;

    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  onPress = (product) => {
    let vendor = this.props.vendors.filter(
      (vendorItem) => vendorItem.id === product?.vendorID,
    );
    this.setState({ selectedItem: product });
    this.setState({ vendor: vendor[0] });
    this.setState({ isVisible: true });
  };

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      titleStyle={FoodListItemStyle.title}
      subtitle={
        <View style={FoodListItemStyle.subtitleView}>
          <Text style={FoodListItemStyle.description}>{item.description}</Text>
          <Text style={FoodListItemStyle.price}>${item.price}</Text>
        </View>
      }
      onPress={() => this.onPress(item)}
      rightIcon={
        <FastImage
          style={FoodListItemStyle.rightIcon}
          source={{ uri: item.photo }}
        />
      }
      containerStyle={{ borderBottomWidth: 0 }}
    />
  );

  render() {
    const { isVisible, selectedItem, vendor } = this.state;
    const { cartItems, cartVendor } = this.props;
    return (
      <View style={styles.container}>
        <Modal
          style={styles.modalContainer}
          swipeDirection="down"
          onSwipeComplete={() => this.setState({ isVisible: false })}
          onModalHide={async () => storeCartToDisk(cartItems, cartVendor)}
          isVisible={isVisible}>
          <SingleItemDetail
            close={() => this.setState({ isVisible: false })}
            vendor={vendor}
            foodItem={selectedItem}
          />
        </Modal>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    );
  }
}

SearchScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  vendors: state.vendor.vendors,
  cartVendor: state.cart.vendor,
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps)(SearchScreen);
