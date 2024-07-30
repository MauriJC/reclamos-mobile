import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { List, Surface, Text } from 'react-native-paper';

const User = () => {
    return (
        <SafeAreaProvider>
            <View style={{ marginTop: 24, marginLeft: 5 }}>
                <Text>
                    Pantalla de usuario
                </Text>

            </View>

        </SafeAreaProvider>
    )
}

export default User
