import { StyleSheet } from 'react-native';
import DynamicAppStyles from '../../DynamicAppStyles';
import { Appearance } from 'react-native-appearance';
import {widthPercentageToDP as w, heightPercentageToDP as h} from 'react-native-responsive-screen';

const colorScheme = Appearance.getColorScheme();

const styles = StyleSheet.create({
  container: {
    backgroundColor:
      DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    flex: 1,
    padding: 10,
    width: w(100),
    height: h(80),
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    

  },
  title: {
    fontFamily: DynamicAppStyles.fontFamily.bold,
    color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
    fontSize: 25,
    marginVertical: 12
  },
  photo: {
    width: '100%',
    height: 200,
    marginTop: 2,
  },
  detail: {
    height: 65,
    width: 65,
    marginBottom: 5,
  },
  detailPhotos: {
    height: 65,
    marginTop: 10,
  },
  description: {
    marginTop: 20,
    fontFamily: DynamicAppStyles.fontFamily.bold,
    color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
  },
  buttonSetContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonSet: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: DynamicAppStyles.colorSet[colorScheme].grey6,
  },
  count: {
    padding: 10,
    marginTop: 2,
    color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
    fontFamily: DynamicAppStyles.fontFamily.bold,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalCloseButtonContainer: {
  justifyContent: 'center',
  padding: 5,

  },
  modalClosebuttonButtonText: {
    color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
    fontWeight: 'bold',
    fontSize: 30
  },
  buttonContainer: {
    padding: 10,
    width: 50,
  },
  buttonText: {
    color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
  },
  price: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    fontFamily: DynamicAppStyles.fontFamily.bold,
    padding: 10,
    textAlign: 'center',
    color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
    borderColor: DynamicAppStyles.colorSet[colorScheme].grey3,
  },
  actionContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 50,
  },
  actionButtonContainer: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    backgroundColor:
      DynamicAppStyles.colorSet[colorScheme].mainThemeForegroundColor,
  },
  actionButtonText: {
    fontFamily: DynamicAppStyles.fontFamily.bold,
    color: DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
  },
});

export default styles;
