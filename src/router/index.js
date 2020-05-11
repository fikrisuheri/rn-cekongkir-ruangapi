import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Splash, Home, Asal, Tujuan } from '../pages';
const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}
        >
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Asal" component={Asal} />
            <Stack.Screen name="Tujuan" component={Tujuan} />
        </Stack.Navigator>
    )
}

export default Router
