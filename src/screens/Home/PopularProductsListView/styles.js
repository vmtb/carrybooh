import {StyleSheet} from 'react-native';
import DynamicAppStyles from '../../../DynamicAppStyles';
import {Appearance} from 'react-native-appearance';
import {heightPercentageToDP as h} from 'react-native-responsive-screen';

const colorScheme = Appearance.getColorScheme();
const styles = StyleSheet.create({
  container: {
    backgroundColor:
      DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    flex: 1,
  },
  productItemContainer: {
    flex: 1,
    margin: 10,
    marginBottom: 20,
  },
  productPhoto: {
    width: '100%',
    height: 200,
  },
  productInfo: {
    marginTop: 10,
    flexDirection: 'row',
  },
  productName: {
    flex: 1,
    fontFamily: DynamicAppStyles.fontFamily.bold,
    textAlign: 'left',
    color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
  },
  productPrice: {
    flex: 1,
    fontFamily: DynamicAppStyles.fontFamily.bold,
    textAlign: 'right',
    color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: h(2),
  },
});

export default styles;
