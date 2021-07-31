import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import IconBadge from 'react-native-icon-badge';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles';
import DynamicAppStyles from '../../DynamicAppStyles';
import {Appearance} from 'react-native-appearance';

class ShoppingCartButton extends React.Component {
  render() {
    const { cartItems } = this.props;
    const theme = Appearance.getColorScheme();
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onPress}>
          <IconBadge
            MainElement={
              <Image
                source={require('../../../assets/icons/cart.png')}
                style={{
                  width: 25,
                  height: 25,
                  margin: 6,
                  tintColor:
                    DynamicAppStyles.navThemeConstants[theme].activeTintColor,
                }}
              />
            }
            BadgeElement={
              <Text style={{ color: '#FFFFFF' }}>
                {cartItems.reduce((prev, next) => prev + next.quantity, 0)}
              </Text>
            }
            Hidden={cartItems.length === 0}
            IconBadgeStyle={{
              width: 20,
              height: 20,
              backgroundColor: '#ff5e69',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({ cart }) => ({
  cartItems: cart.cartItems,
});

ShoppingCartButton.propTypes = {
  onPress: PropTypes.func,
  cartItems: PropTypes.array,
};

export default connect(mapStateToProps)(ShoppingCartButton);
