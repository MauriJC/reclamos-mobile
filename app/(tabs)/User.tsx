import { View, Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';

const User = () => {
    return (
        <SafeAreaProvider>
            <Text>
                Pantalla de usuario
            </Text>
        </SafeAreaProvider>
    )
}

export default User
