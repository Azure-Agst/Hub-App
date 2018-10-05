import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';

import { lib_Auth, lib_GetBearer } from 'api/libcal_api.js';
//import authData from 'api/auth.json';

export default class RoomScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      bearer: undefined
    }
    this.getBearer = this.getBearer.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Room Reservation Feature!</Text>
        { this.getBearer() }
      </View>
    );
  }

  getBearer() {
    if (this.state.bearer != undefined) {
      return(
        <Text>{this.state.bearer}</Text>
      )
    } else {
      lib_GetBearer((err, response) => {
        if (err) throw err;
        this.setState((state, data) => ({
          bearer: response
        }));
      })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
