import { StyleSheet } from 'react-native';
import { Appearance } from 'react-native-appearance';

const COLOR_SCHEME = Appearance.getColorScheme();

const styles = (appStyles) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
    },
    emptyTitle: {
      flex: 1,
      alignSelf: 'center',
      alignItems: 'center',
      textAlignVertical: 'center',
      justifyContent: 'center',
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
    },
    flat: {
      flex: 1,
      margin: 10,
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
      fontFamily: appStyles.fontFamily.main,
      paddingLeft: 5,
      paddingRight: 5,
      textAlign: 'center',
      color: appStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
      borderColor: appStyles.colorSet[COLOR_SCHEME].grey6,
    },
    price: {
      padding: 10,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      fontFamily: appStyles.fontFamily.bold,
      textAlign: 'center',
    },
    title: {
      flex: 1,
      padding: 10,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      fontFamily: appStyles.fontFamily.bold,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    actionButtonContainer: {
      padding: 16,
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
      marginBottom: 30,
    },
    actionButtonText: {
      fontFamily: appStyles.fontFamily.bold,
      color: 'white',
    },
    emptyViewContainer: {
      marginTop: '25%',
      flex: 1,
    },
  });

export default styles;
