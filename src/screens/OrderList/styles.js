import { StyleSheet } from 'react-native';
import DynamicAppStyles from '../../DynamicAppStyles';
import { Appearance } from 'react-native-appearance';

const colorScheme = Appearance.getColorScheme();

const styles = StyleSheet.create({
  flat: {
    flex: 1,
    backgroundColor:
      DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
  },
  container: {
    marginBottom: 30,
    flex: 1,
    padding: 10,
  },
  photo: {
    width: '100%',
    height: 100,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  headerTitle: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    opacity: 0.8,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  count: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1,
    borderWidth: 1,
    fontWeight: 'bold',
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 2,
    paddingBottom: 2,
    textAlign: 'center',
    color: DynamicAppStyles.colorSet[colorScheme].mainThemeForegroundColor,
    backgroundColor:
      DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    borderColor:
      DynamicAppStyles.colorSet[colorScheme].mainThemeForegroundColor,
    borderWidth: 1,
    borderRadius: 3,
  },
  price: {
    padding: 10,
    color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
    fontFamily: DynamicAppStyles.fontFamily.bold,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    flex: 1,
    padding: 10,
    color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
    fontFamily: DynamicAppStyles.fontFamily.bold,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  total: {
    flex: 4,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: DynamicAppStyles.fontFamily.bold,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
    color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
    borderColor: DynamicAppStyles.colorSet.grey3,
  },
  actionButtonContainer: {
    flex: 1,
    borderRadius: 5,
    padding: 3,
    marginRight: 50,
    width: 70,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:
      DynamicAppStyles.colorSet[colorScheme].mainThemeForegroundColor,
  },
  actionButtonText: {
    color: DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    fontSize: 12,
    fontFamily: DynamicAppStyles.fontFamily.bold,
  },
  emptyViewContainer: {
    paddingTop: '25%',
    flex: 1,
    backgroundColor:
      DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
  },
});

export default styles;
