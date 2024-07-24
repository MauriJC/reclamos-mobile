import { Link, useLocalSearchParams } from 'expo-router';
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
import axios from 'axios';

export default function ClaimDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [claimData, setClaimData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usedMaterials, setUsedMaterials] = useState([]);
  const [observations, setObservations] = useState('');
  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null); // Referencia del mapa

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

  //Nota: CORREGIR EL ENDPOINT PARA CERRAR EL RECLAMO
  const submitUsedMaterials = async () => {
    try {
      const response = await axios.post('', {
        usedMaterials: usedMaterials.map(({ id, quantity }) => ({ id, quantity })),
      });
      Alert.alert('Éxito', 'Materiales usados enviados correctamente.');
      setUsedMaterials([]);
    } catch (error) {
      console.error('Error submitting used materials:', error);
      Alert.alert('Error', 'No se pudieron enviar los materiales usados.');
    }
  };

  const closeClaim = async() =>{
    try{
      console.log('close claim')
    }
    catch{
      console.log('aa')
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
            <Text>Ubicacion GPS no disponible</Text>
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
