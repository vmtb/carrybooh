import {StyleSheet} from 'react-native';
import DynamicAppStyles from '../../DynamicAppStyles'
import {Appearance} from 'react-native-appearance';
import {heightPercentageToDP as h} from 'react-native-responsive-screen';
const colorScheme = Appearance.getColorScheme();

const styles = StyleSheet.create({
  container: {
    backgroundColor:
      DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    flex: 1,
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: DynamicAppStyles.colorSet[colorScheme].mainThemeForegroundColor,
    marginHorizontal: 5,
  },
  iconContainer: { flexDirection: 'row' },
  emptyState: {
    fontSize: DynamicAppStyles.fontSet.normal,
    textAlignVertical: 'center',
    alignSelf: 'center',
    marginTop: h(40),
    textAlign: 'center',
    width: 300,
    color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: h(2),
  },
  itemContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  emptyViewContainer: {
    marginTop: '25%',
    flex: 1
  },
  subCategory: {
   fontSize: 20,
   fontWeight: 'bold',
   marginBottom: 10,
   padding: 10
  },
  title: {
    fontSize: 16,
    color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
    fontWeight: '500'
  },
  reserveButton: {
    color: DynamicAppStyles.colorSet[colorScheme].mainThemeForegroundColor,
    fontSize: 16,
    marginHorizontal: 4,
  },
  subtitleView: {
    width: '70%',
    
  },
  description: {
    color: DynamicAppStyles.colorSet[colorScheme].mainSubtextColor,
    fontSize: 12,
    paddingTop: 5,
  },
  price: {
    fontSize: 16,
    color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
    marginTop: 10,
  },
  rightIcon: {
    width: 100,
    height: 100,
  },
});

export default styles;
