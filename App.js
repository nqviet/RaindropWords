import React from 'react';

import { AppRegistry, TouchableHighlight } from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './src/screens/HomeScreen';

const App = StackNavigator({    
  Home: { screen: HomeScreen },   
});
export default App;