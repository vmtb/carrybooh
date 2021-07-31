import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Modal,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import TextButton from 'react-native-button';
import { IMLocalized } from '../../../Core/localization/IMLocalization';
import DynamicAppStyles from '../../../DynamicAppStyles';
import dynamicStyles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import { TNActivityIndicator } from '../../../Core/truly-native';
import ActionSheet from 'react-native-actionsheet';
import { firebaseStorage } from '../../../Core/firebase';
import ModalSelector from 'react-native-modal-selector';
import VendorAppConfig from '../../VendorAppConfig';

export function AddProductView(props) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  const { initialProduct, categoryData } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState({ title: IMLocalized('Select...') });
  const [price, setPrice] = useState('10');
  const [stock, setStock] = useState(0);

  const [localPhotos, setLocalPhotos] = useState([]);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const actionsheetRef = useRef(null);

  useEffect(() => {
    if (initialProduct) {
      if (!VendorAppConfig.isMultiVendorEnabled) {
        setCategory(
          categoryData.find(
            (category) => initialProduct.categoryID === category.id,
          ),
        );
      }
      setName(initialProduct.name);
      setDescription(initialProduct.description);
      setUploadedPhotos(initialProduct.photos);
      setPrice(initialProduct.price);
      setStock(initialProduct.stock);
    }
  }, []);

  const onPressAddPhotoBtn = () => {
    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      title: IMLocalized('Select a photo'),
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        alert(response.error);
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setLocalPhotos([...localPhotos, response]);
      }
    });
  };

  const onRemoveLocalPhoto = (index) => {
    if (index == 0) {
      var array = [...localPhotos];
      array.splice(selectedPhotoIndex, 1);
      setLocalPhotos(array);
    }
  };

  const showActionSheet = async (index) => {
    await setSelectedPhotoIndex(index);
    actionsheetRef.current.show();
  };

  const photos = localPhotos.map((photo, index) => (
    <TouchableOpacity
      key={index.toString()}
      onPress={() => {
        showActionSheet(index);
      }}>
      <FastImage style={styles.photo} source={{ uri: photo?.uri }} />
    </TouchableOpacity>
  ));

  const onlinePhotos = uploadedPhotos.map((photo, index) => (
    <TouchableOpacity
      key={index.toString()}
      onPress={() => {
        showActionSheet(index);
      }}>
      <FastImage style={styles.photo} source={{ uri: photo }} />
    </TouchableOpacity>
  ));

  const onCancel = () => {
    props.onCancel();
  };

  const onPost = () => {
    if (!name) {
      alert(IMLocalized('Title was not provided.'));
      return;
    }
    if (!description) {
      alert(IMLocalized('Description was not set.'));
      return;
    }
    if (!price) {
      alert(IMLocalized('Price is empty.'));
      return;
    }
    if (localPhotos.length == 0) {
      alert(IMLocalized('Please choose at least one photo.'));
      return;
    }
    setLoading(true);

    let photoUrls = [];

    const uploadPromiseArray = [];
    localPhotos.forEach((file) => {
      if (!file?.uri.startsWith('https://')) {
        uploadPromiseArray.push(
          new Promise((resolve, reject) => {
            firebaseStorage.uploadFile(file).then((response) => {
              if (response.downloadURL) {
                photoUrls.push(response.downloadURL);
              }
              resolve();
            }, error => {
              reject();
            });
          }),
        );
      }
    });

    Promise.all(uploadPromiseArray)
      .then((values) => {
        var uploadObject = {
          name: name,
          price: price,
          photo: photoUrls.length > 0 ? photoUrls[0] : null,
          photos: photoUrls,
          description,
          stock: stock
        };
        if (!VendorAppConfig.isMultiVendorEnabled) {
          uploadObject.categoryID = category.id;
        }
        if (initialProduct) {
          props.onUpdate({
            id: initialProduct.id,
            ...uploadObject,
          });
        } else {
          props.addProduct(uploadObject);
        }
        onCancel();
        setLoading(false);
      })
      .catch((reason) => {
        onCancel();
        console.log(reason);
        setLoading(false);
        alert(reason)
      });
  };
console.log("categoryData: ", categoryData)
  return (
    <Modal
      visible={props.isVisible}
      animationType="slide"
      onRequestClose={onCancel}>
      <View style={[styles.bar, styles.navBarContainer]}>
        <Text style={styles.headerTitle}>{IMLocalized('Add Product')}</Text>
        <TextButton
          style={[styles.rightButton, styles.selectorRightButton]}
          onPress={onCancel}>
          {IMLocalized('Cancel')}
        </TextButton>
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{IMLocalized('Title')}</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Start typing"
            placeholderTextColor={DynamicAppStyles.colorSet[colorScheme].grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{IMLocalized('Description')}</Text>
          <TextInput
            multiline={true}
            numberOfLines={2}
            style={styles.input}
            onChangeText={(text) => setDescription(text)}
            value={description}
            placeholder="Start typing"
            placeholderTextColor={DynamicAppStyles.colorSet[colorScheme].grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.title}>{IMLocalized('Price')}</Text>
            <TextInput
              style={styles.priceInput}
              keyboardType="numeric"
              value={price}
              onChangeText={(text) => setPrice(text)}
              placeholderTextColor={DynamicAppStyles.colorSet[colorScheme].grey}
              underlineColorAndroid="transparent"
            />
            
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>{IMLocalized('Quantity')}</Text>
            <TextInput
              style={styles.priceInput}
              keyboardType="numeric"
              value={stock}
              onChangeText={(text) => setStock(text)}
              placeholderTextColor={DynamicAppStyles.colorSet[colorScheme].grey}
              underlineColorAndroid="transparent"
            />
            
          </View>
          {!VendorAppConfig.isMultiVendorEnabled && <ModalSelector
            touchableActiveOpacity={0.9}
            data={categoryData}
            sectionTextStyle={styles.sectionTextStyle}
            optionTextStyle={styles.optionTextStyle}
            optionContainerStyle={styles.optionContainerStyle}
            cancelContainerStyle={styles.cancelContainerStyle}
            cancelTextStyle={styles.cancelTextStyle}
            selectedItemTextStyle={styles.selectedItemTextStyle}
            backdropPressToClose={true}
            cancelText={IMLocalized('Cancel')}
            initValue={category?.title ?? IMLocalized('Select...')}
            onChange={(option) => {
              setCategory({ id: option.id, title: option.title });
            }}>
            <View style={styles.row}>
              <Text style={styles.title}>{IMLocalized('Category')}</Text>
              <Text style={styles.value}>
                {category?.title ?? IMLocalized('Select...')}
              </Text>
            </View>
          </ModalSelector>}
          <Text style={styles.addPhotoTitle}>{IMLocalized('Add Photos')}</Text>
          <ScrollView style={styles.photoList} horizontal={true}>
            {photos}
            {onlinePhotos}
            <TouchableOpacity onPress={onPressAddPhotoBtn}>
              <View style={[styles.addButton, styles.photo]}>
                <Icon name="camera" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
      {loading ? (
        <TNActivityIndicator appStyles={DynamicAppStyles} />
      ) : (
        <TextButton
          containerStyle={styles.addButtonContainer}
          onPress={onPost}
          style={styles.addButtonText}>
          {initialProduct
            ? IMLocalized('Update Product')
            : IMLocalized('Add Product')}
        </TextButton>
      )}
      <ActionSheet
        ref={actionsheetRef}
        options={[IMLocalized('Remove Photo'), IMLocalized('Cancel')]}
        cancelButtonIndex={1}
        destructiveButtonIndex={0}
        onPress={(index) => {
          onRemoveLocalPhoto(index);
        }}
      />
    </Modal>
  );
}
