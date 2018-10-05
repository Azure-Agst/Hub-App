import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';

import { lib_Auth, lib_GetBearer, lib_GetCategories } from 'api/libcal_api.js';

export default class RoomScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      statedata: undefined
    }
    this.getCats = this.getCats.bind(this);

    // //save bearer to state on page load
    // lib_GetBearer((err, response) => {
    //   if (err) throw err;
    //   this.setState((state, data) => ({
    //     bearer: response
    //   }));
    // })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Room Reservation Feature!</Text>
        { this.getCats() }
      </View>
    );
  }

  getCats() {
    if (this.state.statedata == undefined) {
      lib_GetCategories((err, data) => {
        if (err) console.warn(err);

        this.setState((state) => ({
          statedata: data[0].categories
        }));
      })
    } else {
      return(
        <View>
          {this.state.statedata.map((cat, index) =>
              <Text key={index}>{cat.name}</Text>
          )}
        </View>
      )
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
