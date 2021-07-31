import { StyleSheet } from 'react-native';
import { Appearance } from 'react-native-appearance';

const COLOR_SCHEME = Appearance.getColorScheme();

const dynamicStyles = (appStyles) =>
  StyleSheet.create({
    checkoutTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      margin: 20,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
    },
    optionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      paddingVertical: 12,
      borderBottomColor: appStyles.colorSet[COLOR_SCHEME].grey0,
      borderTopColor: appStyles.colorSet[COLOR_SCHEME].grey0,
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
      borderTopWidth: 1,
      borderBottomWidth: 1,
    },
    optionTile: {
      color: appStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
      fontSize: 14,
      fontWeight: '900',
    },
    options: {
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      fontSize: 14,
      fontWeight: '900',
    },
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet[COLOR_SCHEME].whiteSmoke,
    },
    actionButtonContainer: {
      padding: 16,
      width: '90%',
      alignSelf: 'center',
      borderRadius: 5,
      position: 'absolute',
      bottom: 0,
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
      marginBottom: 30,
    },
    actionButtonText: {
      fontFamily: appStyles.fontFamily.bold,
      color: 'white',
    },
  });

export default dynamicStyles;
