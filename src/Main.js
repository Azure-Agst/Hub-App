import React from 'react';
import { StyleSheet, Text, View, SafeAreaView,
         ScrollView, Dimensions, Image, Platform,
         StatusBar } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation'
import { Icon } from 'native-base';

import { lib_Auth } from 'api/libcal_api.js';
import Home from './home/Home.js';
import Rooms from './rooms/Rooms.js';

const {width} = Dimensions.get('window')

export default class Main extends React.Component {
  constructor(props){
    super(props);

    lib_Auth((err, data) => {
      console.log(data)
    });
  }

  render() {
    return (
      <AppNav/>
    );
  }
}

const AppNav = createDrawerNavigator({
    "Home Page": {
      screen: Home,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="home" style={{fontSize:24, color:tintColor }} />
        )
      }
    },
    Rooms: {
      screen: Rooms,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="calendar" style={{fontSize:24, color:tintColor }} />
        )
      }
    }
  }, {
    drawerWidth: width/2,
    contentOptions: {
      activeTintColor: 'orange'
    }
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
