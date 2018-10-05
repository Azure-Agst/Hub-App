import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { Header, Body, Left, Right, Icon, Button, Title } from 'native-base';

import RoomIndex from './screens/RoomIndex.js';

export default RoomStackNav = createStackNavigator(
  {
    Index: {
      screen: RoomIndex,
      navigationOptions: ({ navigation }) => ({
        title: 'Rooms'
      })
    }
  }
)
