import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabLayout() {
    const colorScheme = useColorScheme();


    return (
        <SafeAreaProvider >
            <Tabs initialRouteName="index"
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: false,

                }}>
                <Tabs.Screen name="index" options={{
                    title: 'Reclamos',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'briefcase' : 'briefcase-outline'} color={color} />
                    ),
                }} />
                <Tabs.Screen name="Installations"
                    options={{
                        title: 'Instalaciones',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'hammer' : 'hammer-outline'} color={color} />
                        ),
                    }} />
                <Tabs.Screen name="User"
                    options={{
                        title: 'Usuario',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
                        ),
                    }} />

                <Tabs.Screen name="claims"
                    options={{
                        title: 'Usuario',
                        href: null,
                    }}
                     />

            </Tabs>
        </SafeAreaProvider>
    );
}
