import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { useCameraPermissions, CameraView } from 'expo-camera';
import * as Location from 'expo-location';
import { Button, ActivityIndicator, MD2Colors, Text } from 'react-native-paper';

const PhotoCapture = ({ photos, setPhotos, handleRemovePhoto, location, setLocation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [locationPermission, requestLocationPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      requestLocationPermission(status === 'granted');
      setLoading(false);
    })();
  }, []);

  const handleRequestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    requestLocationPermission(status === 'granted');
  };

  const handleRequestCameraPermission = async () => {
    const { status } = await requestPermission();
    if (status === 'granted') {
      Alert.alert('Éxito', 'Permiso de cámara concedido.');
    } else {
      Alert.alert('Error', 'Permiso de cámara denegado.');
    }
  };

  if (loading) {
    return <View style={styles.container}><ActivityIndicator animating={true} color={MD2Colors.red800} /></View>;
  }

  if (!permission.granted || !locationPermission) {
    return (
      <View style={styles.container}>
        <Text>Necesitamos tu permiso para acceder a la cámara y localización</Text>
        <Button onPress={handleRequestCameraPermission}>Dar acceso a cámara</Button>
        <Button onPress={handleRequestLocationPermission}>Dar permiso de localización</Button>
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef && photos.length < 3) {
      const photo = await cameraRef.takePictureAsync({base64:true});
      const location = await Location.getCurrentPositionAsync({});
      setPhotos([...photos, { uri: photo.uri, location, base64:photo.base64 }]);
      setLocation(location); // Set the location in ClaimDetailsScreen
    } else {
      Alert.alert('Limit Reached', 'You can only take 3 photos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center' }} variant='titleMedium'>Fotografías de la visita</Text>
      <CameraView style={styles.camera} ref={(ref) => setCameraRef(ref)} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.text}>Tomar fotografía</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.photosContainer}>
        {photos.map((item, index) => (
          <View key={index} style={styles.photoContainer}>
            <Image source={{ uri: item.uri }} style={styles.photo} />
            <Text>Lat: {item.location.coords.latitude}</Text>
            <Text>Long: {item.location.coords.longitude}</Text>
            <Button onPress={() => handleRemovePhoto(index)} mode="contained" style={styles.deleteButton}>
              Eliminar
            </Button>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    height: 500,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 10,
  },
  photoContainer: {
    margin: 5,
    alignItems: 'center',
    width:'45%'
  },
  photo: {
    width: 100,
    height: 100,
  },
  deleteButton: {
    marginTop: 10,
  },
});

export default PhotoCapture;
