import React from 'react'
import {  DataTable } from 'react-native-paper';
import { View, ScrollView } from 'react-native';

const Details = ({ data }) => {
    //console.log('details client',data.Service.Client);
    return (

        <ScrollView>
            <View>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Informacion relevante</DataTable.Title>
                        <DataTable.Title> </DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                        <DataTable.Cell>Nombre</DataTable.Cell>
                        <DataTable.Cell>{data.Service.Client?.name}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Apellido</DataTable.Cell>
                        <DataTable.Cell>{data.Service.Client?.last_name}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Nro. de Linea</DataTable.Cell>
                        <DataTable.Cell>{data.Service.line_number}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Tipo de servicio</DataTable.Cell>
                        <DataTable.Cell>{data.Service.Service_type.description}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Direccion</DataTable.Cell>
                        {data.Service.Location ?
                            <DataTable.Cell>{data.Service.Location.textual_direction}</DataTable.Cell> :
                            <DataTable.Cell>No disponible</DataTable.Cell>}
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Ubicacion GPS</DataTable.Cell>
                        {data.Service.Location ?
                            <>
                                <DataTable.Cell>Lat: {data.Service.Location.latitude}</DataTable.Cell>
                                <DataTable.Cell>Long: {data.Service.Location.longitude}</DataTable.Cell>
                            </>
                            :
                            <DataTable.Cell>No disponible</DataTable.Cell>}
                    </DataTable.Row>
                </DataTable>
            </View>
        </ScrollView>
    )
}



export default Details
