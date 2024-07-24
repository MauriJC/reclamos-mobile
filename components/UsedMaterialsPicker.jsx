import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Button, TextInput, Text, Menu, ActivityIndicator, MD2Colors, DataTable } from 'react-native-paper';
import { claimsApi } from '../src/config/claimsAPI';

const UsedMaterialsPicker = ({ onAddUsedMaterial, usedMaterials, setUsedMaterials }) => {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaterials();
    
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await claimsApi.get('/materials'); // Cambia la URL a la ruta correcta
      setMaterials(response.data);
    } catch (error) {
      console.error('Error fetching materials:', error);
    } finally {
      setLoading(false); // Marcar como cargado, ya sea con éxito o error
    }
  };

  const addMaterial = () => {
    if (selectedMaterial && quantity) {
      const material = materials.find(mat => mat.id_material === selectedMaterial);
      setUsedMaterials((prevMaterials) => [...prevMaterials, { ...material, quantity }]);
      setSelectedMaterial(null);
      setQuantity('');
    } else {
      Alert.alert('Error', 'Selecciona un material y una cantidad.');
    }
  };

  const handleRemoveMaterial = (index) => {
    setUsedMaterials((prevMaterials) => prevMaterials.filter((_, i) => i !== index));
  };

  if (loading) {
    return <View style={styles.container}><ActivityIndicator animating={true} color={MD2Colors.red800} /></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>



      <Text variant='titleMedium'>Materiales adicionales utilizados</Text>
      <Text style={styles.label}>Selecciona un Material</Text>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button onPress={() => setMenuVisible(true)} mode="outlined" style={styles.menuButton}>
            {selectedMaterial ? materials.find(mat => mat.id_material === selectedMaterial).name : 'Selecciona un material'}
          </Button>
        }
      >
        {materials.map((material) => (
          <Menu.Item
            key={material.id_material}
            onPress={() => {
              setSelectedMaterial(material.id_material);
              setMenuVisible(false);
            }}
            title={material.name}
          />
        ))}
      </Menu>
      <TextInput
        style={styles.input}
        label="Cantidad"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <Button mode="contained" onPress={addMaterial} style={styles.button}>
        Agregar Material
      </Button>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Material</DataTable.Title>
          <DataTable.Title numeric>Cantidad</DataTable.Title>
          <DataTable.Title numeric>Acciones</DataTable.Title>
        </DataTable.Header>

        {usedMaterials.map((material, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{material.name}</DataTable.Cell>
            <DataTable.Cell numeric>{material.quantity}</DataTable.Cell>
            <DataTable.Cell numeric>
              <Button onPress={() => handleRemoveMaterial(index)} mode="text">
                Eliminar
              </Button>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  menuButton: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    width: '100%',
  },
});

export default UsedMaterialsPicker;
