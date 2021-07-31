import React, {useState,} from 'react';
import {View, Text, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import dynamicStyles from './styles';
import IMRatingReview from '../../components/IMRatingReview/IMRatingReview';
import {Appearance} from 'react-native-appearance';
import IMVendorFilterModal from '../../components/IMVendorFilterModal/IMVendorFilterModal';

function IMVendorsScreen({navigation, vendors, appConfig, appStyles}) {
  const styles = dynamicStyles(appStyles);
  const [filters, setFilters] = useState({});
  const [isVisible, setVisible] = useState(false);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [ref1, setRef1] = useState(null);
  const COLOR_SCHEME = Appearance.getColorScheme();

  const onPressVendorItem = item => {
    navigation.navigate('SingleVendor', {
      vendor: item,
    });
  };

  const onPressReview = item => {
    navigation.navigate('Reviews', {
      entityID: item.id,
      appStyles,
      appConfig,
    });
  };

  const onViewFilter = currentFilter => {
    setFilters(currentFilter);
    setVisible(true);
  };

  const renderVendorItem = (item, key) => {

    
    let count = item.reviewsCount === undefined ? 0 : item.reviewsCount;
    let reviewAvg =
      item.reviewsCount === undefined
        ? 0
        : Math.fround(item.reviewsSum / item.reviewsCount);
    reviewAvg = Number(Math.round(reviewAvg + 'e' + 2) + 'e-' + 2);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPressVendorItem(item)}
        key={key}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          dataSourceCords[key] = layout.y;
          setDataSourceCords(dataSourceCords);
         
        }}
        >
        <View style={styles.vendorItemContainer}>
          <FastImage
            placeholderColor={appStyles.colorSet[COLOR_SCHEME].grey9}
            style={styles.foodPhoto}
            source={{uri: item.photo}}
          />
          <View style={styles.foodInfo}>
            <Text style={styles.foodName}>{item.title}</Text>
          </View>
          <Text
            onPress={() => onViewFilter(item.filters)}
            style={styles.description}>
            Outdoor Seats, Free WIFI
          </Text>
          <IMRatingReview
            appStyles={appStyles}
            onPressReview={() => onPressReview(item)}
            number={count}
            rating={reviewAvg}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const scrollHandler = (index) => {
    console.log(dataSourceCords.length, index);
    if (dataSourceCords.length > index) {
      ref1.scrollTo({
        x: 0,
        y: dataSourceCords[index - 1],
        animated: true,
      });
    } else {
      alert('Out of Max Index');
    }
  };
  const renderCategoryItem = ({ item , index}) => (
    <TouchableOpacity onPress={() => scrollHandler(index)} style={{justifyContent: 'center', height: 70}}>
      <View style={{justifyContent: 'center',  backgroundColor: '#000', margin: 5, padding: 5, borderRadius: 50 }}>
        
        <Text style={{color: '#fff', fontWeight: 'bold'}}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      <IMVendorFilterModal
        appStyles={appStyles}
        isVisible={isVisible}
        filters={filters}
        close={() => setVisible(false)}
      />
      {/* <FlatList
        horizontal
        initialNumToRender={12}
        data={vendors}
        renderItem={renderCategoryItem}
        keyExtractor={item => `${item.id}`}
      /> */}
      <ScrollView
        ref={(ref) => {
          setRef1(ref);
        }}>
        {vendors.map(renderVendorItem)}
      </ScrollView> 
      {/* <FlatList
        initialNumToRender={12}
        data={vendors}
        renderItem={renderVendorItem}
        keyExtractor={item => `${item.id}`}
      /> */}
    </View>
  );
}

export default IMVendorsScreen;