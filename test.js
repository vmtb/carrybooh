// import React in our code
import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const App = () => {
  const [dataSource, setDataSource] = useState([]);
  const [scrollToIndex, setScrollToIndex] = useState(0);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const scrollHandler = () => {
    console.log(dataSourceCords.length, scrollToIndex);
    if (dataSourceCords.length > scrollToIndex) {
      ref.scrollTo({
        x: 0,
        y: dataSourceCords[scrollToIndex - 1],
        animated: true,
      });
    } else {
      alert('Out of Max Index');
    }
  };

  const ItemView = (item, key) => {
    return (
      // Flat List Item
      <View
        key={key}
        style={styles.item}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          dataSourceCords[key] = layout.y;
          setDataSourceCords(dataSourceCords);
          console.log(dataSourceCords);
          console.log('height:', layout.height);
          console.log('width:', layout.width);
          console.log('x:', layout.x);
          console.log('y:', layout.y);
        }}>
        <Text
          style={styles.itemStyle}
          onPress={() => getItem(item)}>
          {item.id}. {item.title}
        </Text>
        <ItemSeparatorView />
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View style={styles.itemSeparatorStyle} />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };
const list = [{'sub_category': 'mobile', 'name': 'nokia', 'price': 10},
               {'sub_category': 'mobile', 'name': 'oppo', 'price': 20},
               {'sub_category': 'Laptop', 'name': 'sony', 'price': 30},
               {'sub_category': 'mouse', 'name': 'dell', 'price': 40}
              ]

// let price = 
// for(let a=0; a <= list.length; a++){
//   if(list[a].name === 'oppo'){
//     console.log(list[a].price)
//   }
// }



  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text>price</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    // backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  itemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e73be',
    padding: 5,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  searchButton: {
    padding: 15,
    backgroundColor: '#f4801e',
  },
  searchButtonText: {
    color: '#fff',
  },
});

export default App;