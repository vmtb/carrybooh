import React, { useState, useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import styles from './styles';
import MAP_STYLE from '../../../../MapStyle';
import { IMLocalized } from '../../../localization/IMLocalization';

function IMVendorMapScreen({ navigation }) {
  const vendors = useSelector((state) => state.vendor.vendors);

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markers, setMarkers] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: IMLocalized('Restaurants'),
      headerRight: () => <Text />,
    });
    setMarkers(vendors);
  }, [vendors]);

  const onPressMarkerItem = (item) => {
    navigation.navigate('SingleVendor', {
      vendor: item,
    });
  };

  return (
    <View style={styles.container}>
      <MapView region={region} style={styles.map} customMapStyle={MAP_STYLE}>
        {markers?.length > 0 && markers.map((marker) => (
          <Marker
            onPress={() => onPressMarkerItem(marker)}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            title={marker.title}
          />
        ))}
      </MapView>
    </View>
  );
}

export default IMVendorMapScreen;