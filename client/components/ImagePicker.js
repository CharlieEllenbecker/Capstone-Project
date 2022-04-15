import * as ImagePicker from 'expo-image-picker';

export const ImagePickerCom = () => {
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
    
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log(result.uri);
    
        if (result.cancelled === true) {
          return;
        }
        setSelectedImage(result.uri);
        //require('../assets/banners/food-banner1.jpg')
      };

      return openImagePickerAsync;
}