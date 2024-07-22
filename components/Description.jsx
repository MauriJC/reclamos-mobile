import React from 'react'
import { Text, DataTable } from 'react-native-paper';
import { StyleSheet, ScrollView, View } from 'react-native';

const Description = ({ data }) => {
    //console.log(data.Service.Client);
    return (


        <View style={styles.container}>
            <Text variant='titleMedium'>
                Descripcion del reclamo
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

export default Description

