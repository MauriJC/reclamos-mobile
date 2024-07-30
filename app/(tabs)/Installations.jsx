import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { claimsApi } from '../../src/config/claimsAPI';
import { List, Surface, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';

const Installations = () => {
    const [installationsData, setInstallationsData] = useState([]);

    useEffect(() => {
        getInstallations();
    }, [])

    const getInstallations = async () => {
        const response = await claimsApi.get(`/installations/new`)
        //console.log(response.data)
        setInstallationsData(response.data)
    }


    const renderInstallations = () => {
        const installationsMap = installationsData.map(installation => {
            //console.log(installation)
            return (
                <Surface key={installation.id_installation}>
                    <List.Item
                        title={installation.news}
                        description={installation.observations}
                        left={props => <List.Icon {...props} icon="exclamation" />}
                        right={props => (
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ color: props.color }}>{installation.status}</Text>
                                <Link href={`installation/${installation.id_installation}`}>
                                    <List.Icon {...props} icon="arrow-right-circle" />
                                </Link>
                            </View>
                        )}
                    />
                </Surface>
            )
        })
        return installationsMap;
    }

    return (
        <SafeAreaProvider>
            <View style={{
                marginTop: 12,
            }}>
                <List.Subheader>
                    Instalaciones asignadas
                </List.Subheader>
                {installationsData ? renderInstallations() : 'Loading...'}

                <List.Subheader>
                    Otras instalaciones
                </List.Subheader>

            </View>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
    }
});



export default Installations
