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
  modalContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: h(2),
  },
  mapImage: {width: 25, height: 25},
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
