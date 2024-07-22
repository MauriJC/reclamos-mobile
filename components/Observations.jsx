import React from 'react'
import { Text } from 'react-native-paper';
import { StyleSheet, ScrollView, View } from 'react-native';


const Observations = () => {
    return (

        <View style={styles.container}>
            <Text variant='titleMedium'>
                Observaciones del reclamo
            </Text>
        </View>
    )
}


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
})


export default Observations;
