import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { claimsApi } from '../../src/config/claimsAPI';
import { List } from 'react-native-paper';

const Installations = () => {


    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);




    const [installationsData, setInstallationsData] = useState([]);

    useEffect(() => {
        getInstallations();
    }, [])

    const getInstallations = async () => {
        const response = await claimsApi.get(`/installations`)
        console.log(response.data)
        setInstallationsData(response.data)
    }


    const renderInstallations = () => {
        console.log('nada')
        const installationsMap = installationsData.map(installation => {
            //console.log(installation)
            return (<List.Item key={installation.id_installation}
                title={installation.news}
                description={installation.observations}
                left={props => <List.Icon {...props} icon="exclamation" />}
                right={props => (
                    <View style={{ justifyContent: 'center' }}>
                      <Text style={{ color: props.color }}>{installation.status}</Text>
                    </View>
                  )}

            />)
        })
        return installationsMap;

    }

    return (
        <SafeAreaProvider>
            <View style={{
                    marginTop:12,
                }}>
                <List.Subheader>
                    Instalaciones
                </List.Subheader>

                {installationsData ? renderInstallations() : 'Loading...'}
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
        fontSize:20,
    }
});



export default Installations
