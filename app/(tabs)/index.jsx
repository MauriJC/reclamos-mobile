import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';
import { claimsApi } from '../../src/config/claimsAPI'
import { SafeAreaProvider } from 'react-native-safe-area-context';


const Claims = () => {
    const [data, setData] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        getClaims();
    }, []);


    const getClaims = async () => {
        const response = await claimsApi.get(`/claims`)
        setData(response.data)
    }

    const handleGetClaim = () => {
        // Hacer una solicitud POST cuando se presione el botón
        claimsApi.get(`/claims/${inputValue}`)
            .then(response => {
                console.log('Respuesta de la solicitud GET:', response.data);
                setData(response.data)
            })
            .catch(error => {
                console.error('Error al hacer la solicitud GET:', error);
            });
    };


    const renderClaims = () => {
        if (data) {
            let claims = data.map(claim => {
                console.log(claim)
                if (claim.status == 'Nuevo') {
                    return (<List.Item
                        style={{
                            backgroundColor: theme.colors.primaryContainer
                        }}
                        key={claim.id_claim}
                        title={claim.observations}
                        description={claim.observations}
                        left={props => <List.Icon {...props} icon="exclamation" />}
                        right={props => (
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ color: props.color }}>{claim.status}</Text>
                                <Link href={`claims/${claim.id_claim}`}>
                                    <List.Icon {...props} icon="arrow-right-circle" />
                                </Link>
                            </View>
                        )}
                    />)
                }
                else return null
            });
            return claims;
        }
    }



    return (
        <SafeAreaProvider >
            <View style={{
                marginTop: 12,

            }}>
                <List.Subheader>Reclamos asignados</List.Subheader>

                {renderClaims()}
            </View>

            <View style={{
                marginTop: 12,
            }}>
                <List.Subheader>Listado de otros reclamos</List.Subheader>

                {renderClaims()}
            </View>

        </SafeAreaProvider>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        width: '100%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        width: '100%',
    },
    title: {
        fontSize: 20,
    },
});


export default Claims
