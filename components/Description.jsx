import React from 'react'
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { StyleSheet, ScrollView, View } from 'react-native';

const Description = ({ description }) => {
    //console.log(data.Service.Client);
    return (
        <View style={styles.container}>
            <Card>
                <Card.Content>
                    <Text variant="titleLarge">Descripcion del reclamo</Text>
                    <Text variant="bodyMedium"> {description}</Text>
                </Card.Content>
            </Card>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        width: '100%'
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
})

export default Description

