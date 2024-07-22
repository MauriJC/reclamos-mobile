import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, ScrollView, View } from 'react-native';
import { claimsApi } from '../../src/config/claimsAPI';
import { useEffect, useState } from 'react';
import { ActivityIndicator, MD2Colors, Text, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
//Components imports
import AssignedMaterials from '../../components/AssignedMaterials';
import UsedMaterialsPicker from '../../components/UsedMaterialsPicker'
import Observations from '../../components/Observations';
import Description from '../../components/Description';
import Details from '../../components/Details';

export default function ClaimDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [claimData, setClaimData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usedMaterials, setUsedMaterials] = useState([]);


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
        usedMaterials: usedMaterials.map(({ id, quantity }) => ({ id, quantity }))
      });
      Alert.alert('Éxito', 'Materiales usados enviados correctamente.');
      setUsedMaterials([]);
    } catch (error) {
      console.error('Error submitting used materials:', error);
      Alert.alert('Error', 'No se pudieron enviar los materiales usados.');
    }
  };

  if (loading) {
    return <View style={styles.container}><ActivityIndicator animating={true} color={MD2Colors.red800} /></View>;
  }

  if (!claimData) {
    return <Text>No data available</Text>;
  }

  const serviceLocation = claimData?.Service?.Location



  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text variant='titleLarge'>Detalles del reclamo {id}</Text>
        </View>

        <Details data={claimData}></Details>
        <Divider />
        <View>
          {serviceLocation?.latitude && serviceLocation?.longitude ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: serviceLocation.latitude,
                longitude: serviceLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
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
          ) : (
            <Text>    Ubicacion GPS no disponible</Text>
          )}

        </View>

        <Divider />

        <Description/>

        <Divider></Divider>

        <View>
          <AssignedMaterials service_type={claimData.Service.Service_type.description} ></AssignedMaterials>
        </View>

        <Divider />

        <Observations></Observations>    

        <UsedMaterialsPicker onAddUsedMaterial={handleAddUsedMaterial} />

        <View style={styles.listContainer}>
          {usedMaterials.map((material, index) => (
            <View key={index} style={styles.materialItem}>
              <Text>{material.name}</Text>
              <Text>Cantidad: {material.quantity}</Text>
            </View>
          ))}
        </View>

        <Divider></Divider>
        <Text>
          Fotografias de la instalacion
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    flex: 1,
    width: '100%',
    height: 400,
  },
  fullwidth: {
    display: 'flex',
    flex: 1
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


