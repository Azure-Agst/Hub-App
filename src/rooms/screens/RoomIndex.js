import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button,
         AsyncStorage, ActivityIndicator } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';

import { lib_Auth, lib_GetBearer, lib_GetCategories } from 'api/libcal_api.js';

export default class RoomScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      statedata: undefined,
      isloading: true
    }
    this.getCats = this.getCats.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  render() {
    return (
      <View style={styles.bkg}>
        <View style={styles.container}>
          { this.isLoading() }
          <Text style={styles.titleText}>Reserve a room!</Text>
          { this.getCats() }
        </View>
      </View>
    );
  }

  isLoading() {
    if (this.state.isloading == true) {
      return(
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="orange" />
        </View>
      )
    }
  }

  getCats() {
    if (this.state.statedata == undefined) {
      lib_GetCategories((err, data) => {
        if (err) console.warn(err);

        this.setState((state) => ({
          statedata: data[0].categories,
          isloading: false
        }));
      })
    } else {
      return(
        <View>
          {this.state.statedata.map((cat, index) =>
            <View key={index} style={styles.spacing}>
              <Button
                onPress={() => console.log("Wow! User pressed "+index+"!")}
                title={cat.name}
                color="orange"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          )}
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  titleText: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 30,
    fontWeight: 'bold',
  },
  spacing: {
    marginBottom: 20
  },
  bkg: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
