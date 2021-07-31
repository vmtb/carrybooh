import { StyleSheet } from 'react-native';
import DynamicAppStyles from '../../DynamicAppStyles';
import { Appearance } from "react-native-appearance";

const colorScheme = Appearance.getColorScheme()

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  photo: {
    width: '100%',
    height: 200,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  info: {
    padding: 20,
    alignItems: 'center',
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    alignItems: 'center',
  },
  title: {
    fontFamily: DynamicAppStyles.fontFamily.bold,
    color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
    fontSize: 25,
  },
  description: {
    marginTop: 10,
    fontFamily: DynamicAppStyles.fontFamily.main,
    color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 5,
    width: '100%',
    backgroundColor: DynamicAppStyles.colorSet[colorScheme].mainThemeForegroundColor,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
  secondaryButtonContainer: {
    marginTop: 10,
    borderRadius: 5,
    width: '100%',
    backgroundColor: DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    padding: 10,
  },
  secondaryButtonText: {
    color: DynamicAppStyles.colorSet[colorScheme].mainThemeForegroundColor,
    fontSize: 14
  },
  textInputContainer: {
    width: '100%',
    marginTop: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: DynamicAppStyles.colorSet[colorScheme].grey3,
    borderRadius: 5,
  },
  textInput: {
    height: 42,
    paddingLeft: 10,
    paddingRight: 10,
    color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
  },
  icon: {
    tintColor: DynamicAppStyles.colorSet[colorScheme].mainThemeForegroundColor,
    width: 32,
    height: 32,
    marginRight: 5
  }
});

export default styles;
