import { Link, Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { claimsApi } from '../../src/config/claimsAPI';
import { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, MD2Colors, Text, Divider, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
//Components imports
import AssignedMaterials from '../../components/AssignedMaterials';
import UsedMaterialsPicker from '../../components/UsedMaterialsPicker';
import Observations from '../../components/Observations';
import Description from '../../components/Description';
import Details from '../../components/Details';
import PhotoCapture from '../../components/PhotoCapture';


export default function ClaimDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [claimData, setClaimData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usedMaterials, setUsedMaterials] = useState([]);
  const [observations, setObservations] = useState('');
  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null); // Referencia del mapa
  const router = useRouter()

  useEffect(() => {
    getClaim();
  }, []);

  const getClaim = async () => {
    try {
      const response = await claimsApi.get(`claims/details/${id}`);
      setClaimData(response.data);
    } catch (error) {
      console.error('Error fetching claim data:', error);
    } finally {
      setLoading(false); // Marcar como cargado, ya sea con éxito o error
    }
  };

  const handleAddUsedMaterial = (material) => {
    setUsedMaterials([...usedMaterials, material]);
  };

  const closeClaim = async () => {
    try {
      const photoData = photos.map(photo => ({
        base64: photo.base64,
        latitude: photo.location.coords.latitude,
        longitude: photo.location.coords.longitude
      }));
  
      const usedMaterialsData = usedMaterials.map(({ id_material, quantity }) => ({ id_material, quantity }));
  
      const payload = {
        observations,
        id_claim: claimData.id_claim,
        id_service: claimData.Service.id_service,
        id_mobile: claimData.id_mobile,
        id_client: claimData.Service.id_client,
        photos: photoData,
        usedMaterialsData,
        // Add latitude and longitude to payload regardless
        latitude: photoData[0].latitude,
        longitude: photoData[0].longitude
      };
  
  
      console.log(payload);
  
      // Envía la solicitud POST al backend
      const response = await claimsApi.post('/claims/close', payload);
  
      if (response.status === 200) {
        Alert.alert('Éxito', 'Detalles del reclamo enviados correctamente.');
        // Redirige al usuario a la página principal o a donde sea necesario
        router.replace('/'); // Reemplaza 'Home' con el nombre correcto de tu ruta
      } else {
        Alert.alert('Error', 'No se pudieron enviar los detalles del reclamo.');
      }
    } catch (error) {
      console.error('Error submitting claim details:', error);
      Alert.alert('Error', 'No se pudieron enviar los detalles del reclamo.');
    }
  };

  if (loading) {
    return <View style={styles.container}><ActivityIndicator animating={true} color={MD2Colors.red800} /></View>;
  }

  if (!claimData) {
    return <Text>No data available</Text>;
  }

  const serviceLocation = claimData?.Service?.Location;

  const centerMap = () => {
    if (mapRef.current && serviceLocation) {
      mapRef.current.animateToRegion({
        latitude: serviceLocation.latitude,
        longitude: serviceLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text variant='titleLarge'>Detalles del reclamo {id}</Text>
        </View>

        <Details data={claimData} />
        <Divider />
        <View>
          {serviceLocation?.latitude && serviceLocation?.longitude ? (
            <>
              <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                  latitude: serviceLocation.latitude,
                  longitude: serviceLocation.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: serviceLocation.latitude,
                    longitude: serviceLocation.longitude,
                  }}
                  title={"Lugar del reclamo"}
                  description={"Localizacion"}
                />
              </MapView>
              <Button onPress={centerMap} mode="contained" style={styles.centerButton}>
                Centrar mapa
              </Button>
            </>
          ) : (
            <Text variant='titleMedium' style={{ textAlign: 'center' }}>Ubicacion GPS no disponible</Text>
          )}
        </View>

        <Divider />

        <Description description={claimData.observations} />

        <Divider />

        <View>
          <AssignedMaterials service_type={claimData.Service.Service_type.description} />
        </View>

        <Divider />

        <Observations text={observations} setText={setObservations} />

        <UsedMaterialsPicker
          onAddUsedMaterial={handleAddUsedMaterial}
          usedMaterials={usedMaterials}
          setUsedMaterials={setUsedMaterials}
        />

        <Divider />
        <PhotoCapture
          photos={photos}
          setPhotos={setPhotos}
          handleRemovePhoto={handleRemovePhoto}
          location={location}
          setLocation={setLocation}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
          <Button mode='contained' onPress={closeClaim}>
            Cerrar reclamo
          </Button>
          <Link href={'/'}>
            <Button mode='contained'>
              Cancelar
            </Button>
          </Link>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '90%',
    height: 400,
    alignSelf: 'center',
  },
  fullwidth: {
    display: 'flex',
    flex: 1,
  },
  listContainer: {
    width: '100%',
    marginTop: 16,
  },
  materialItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  button: {
    marginTop: 16,
    width: '100%',
  },
});
