import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { List, Surface, useTheme } from 'react-native-paper';
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

    const renderClaims = () => {
        if (data) {
            let claims = data.map(claim => {
                //console.log(claim)
                if (claim.status == 'Nuevo') {
                    return (
                        <Surface key={claim.id_claim}>
                            <List.Item
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
                            />
                        </Surface>
                    )
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
                <Surface elevation={5}>
                    <List.Subheader>Reclamos asignados</List.Subheader>
                </Surface>

                {renderClaims()}
            </View>

            <View style={{
                marginTop: 12,
            }}>
                <List.Subheader>Listado de otros reclamos</List.Subheader>

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
