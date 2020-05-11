import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Router from './router';
import {Provider} from 'react-redux';
import store from './redux/store';
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Router />
    </NavigationContainer>
    </Provider>
  )
}

export default App
