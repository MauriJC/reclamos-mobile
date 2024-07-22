import React from 'react'
import { Text, DataTable } from 'react-native-paper';
import { View, StyleSheet, ScrollView } from 'react-native';

const AssignedMaterials = ({ service_type }) => {
  
    //console.log(service_type)
    //console.log(data.Service.Client);

    const renderFTTH = () => {
        return (
            <>
                <DataTable.Row>
                    <DataTable.Cell>150 m de Fibra optica</DataTable.Cell>
                    <DataTable.Cell>x1</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Router PON Adata</DataTable.Cell>
                    <DataTable.Cell>x1</DataTable.Cell>
                </DataTable.Row>
            </>
        );
    }


    const renderFTTHTelefono = () => {
        return (
            <>
                <DataTable.Row>
                    <DataTable.Cell>150 m de Fibra optica</DataTable.Cell>
                    <DataTable.Cell>x1</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Router PON Adata</DataTable.Cell>
                    <DataTable.Cell>x1</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Telefono FO</DataTable.Cell>
                    <DataTable.Cell>x1</DataTable.Cell>
                </DataTable.Row>
            </>

        );
    }

    const renderADSL = () => {
        return (
            <>
                <DataTable.Row>
                    <DataTable.Cell>150 m de cable ADSL</DataTable.Cell>
                    <DataTable.Cell>x1</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Router ADSL HUAWEI</DataTable.Cell>
                    <DataTable.Cell>x1</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Digitalizador de linea</DataTable.Cell>
                    <DataTable.Cell>x2</DataTable.Cell>
                </DataTable.Row>
            </>
        );
    }



    const renderADSLTelefono = () => {
        return (
            <>
                <DataTable.Row>
                    <DataTable.Cell>150 m de cable ADSL</DataTable.Cell>
                    <DataTable.Cell>x1</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Router ADSL HUAWEI</DataTable.Cell>
                    <DataTable.Cell>x1</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Digitalizador de linea</DataTable.Cell>
                    <DataTable.Cell>x2</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Telefono de linea estandar SIEMENS</DataTable.Cell>
                    <DataTable.Cell>x2</DataTable.Cell>
                </DataTable.Row>
            </>
        );

    }



    const renderTelefono = () => {
        return (
            <>
                <DataTable.Row>
                    <DataTable.Cell>150 m de cable ADSL</DataTable.Cell>
                    <DataTable.Cell>x1</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Telefono de linea estandar SIEMENS</DataTable.Cell>
                    <DataTable.Cell>x2</DataTable.Cell>
                </DataTable.Row>
            </>
        );
    }


    return (
        <View style={{
            width:'100%'
        }}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Materiales asignados</DataTable.Title>
                    <DataTable.Title> </DataTable.Title>
                </DataTable.Header>
                {service_type == 'FTTH' ? renderFTTH() : null}
                {service_type == 'FTTH + Telefono' ? renderFTTHTelefono() : null}
                {service_type == 'ADSL' ? renderADSL() : null}
                {service_type == 'ADSL + Telefono' ? renderADSLTelefono() : null}
                {service_type == 'Telefono' ? renderTelefono() : null}
            </DataTable>
        </View>
    )
}



export default AssignedMaterials;

