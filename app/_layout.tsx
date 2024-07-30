import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router/stack';
import { PaperProvider, DefaultTheme } from 'react-native-paper';

export default function Layout() {

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            text: 'black',  // Cambia el color del texto a negro
        },
    };


    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme} >
                <Stack initialRouteName="(tabs)" screenOptions={{
                    headerShown: false,
                }}>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="+not-found" />
                </Stack>
            </PaperProvider>
        </SafeAreaProvider>
    );
}
