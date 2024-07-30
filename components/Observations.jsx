import React from 'react';
import { Text, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const Observations = ({ text, setText, installation }) => {
  const [error, setError] = React.useState('');

  const handleChangeText = (text) => {
    setText(text);
    if (text.length < 30) {
      setError('Las observaciones deben tener al menos 30 caracteres.');
    } else {
      setError('');
    }
  };

  return (
    <View style={styles.container}>
      {installation ?
        <Text variant='titleMedium'>
          Observaciones de la instalacion
        </Text> :
        <Text variant='titleMedium'>
          Observaciones del reclamo
        </Text>

      }

      <TextInput
        placeholder="Ingresar observaciones"
        value={text}
        onChangeText={handleChangeText}
        style={[styles.input, { borderColor: error ? 'red' : 'gray' }]}
        maxLength={250}
        multiline={true}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    padding: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
});

export default Observations;
