import { StyleSheet } from 'react-native';
import { Appearance } from 'react-native-appearance';
const COLOR_SCHEME = Appearance.getColorScheme();

const styles = (appStyles) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet[COLOR_SCHEME].whiteSmoke,
      paddingTop: 20,
    },
    upperPane: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 10,
      alignItems: 'center',
    },
    time: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    eta: {
      fontSize: 14,
      marginHorizontal: 10,
      color: appStyles.colorSet[COLOR_SCHEME].mainSubtextColor,
      fontWeight: 'bold',
      marginBottom: -3,
    },
    filled: {
      width: 20,
      height: 4,
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
    },
    unfilled: {
      width: 20,
      height: 4,
      backgroundColor: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
    },
    progressPane: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      height: 20,
      marginHorizontal: 10,
    },
    prepText: {
      fontSize: 18,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      paddingRight: 5,
      marginHorizontal: 10,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    bar: {
      marginVertical: 20,
      alignSelf: 'center',
      marginHorizontal: 10,
    },
    image: {
      width: 150,
      height: 150,
      alignSelf: 'center',
      marginVertical: 100,
      elevation: 4,
      shadowOffset: { width: 4, height: 4 },
    },
    mapStyle: {
      width: '100%',
      height: 300,
      marginVertical: 20,
    },
    scroll: {
      backgroundColor: appStyles.colorSet[COLOR_SCHEME].whiteSmoke,
    },
    mapCarIcon: {
      height: 32,
      width: 32,
      tintColor: appStyles.colorSet[COLOR_SCHEME].mainThemeForegroundColor,
    },
    markerTitle: {
      backgroundColor:
        appStyles.colorSet[COLOR_SCHEME].mainThemeBackgroundColor,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 5,
      color: appStyles.colorSet[COLOR_SCHEME].mainTextColor,
      fontSize: 12,
      fontWeight: 'bold',
      alignItems: 'center',
      overflow: 'visible',
    },
    marker: {
      overflow: 'visible',
    },
  });

export default styles;
