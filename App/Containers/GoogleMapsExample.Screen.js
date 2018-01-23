import React, { Component } from 'react'
import { ScrollView, Text, Image, View, StyleSheet, PermissionsAndroid, Platform, Button } from 'react-native'
import { Images } from '../Themes'
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class GoogleMapsExampleScreen extends Component {

    constructor() {
        super();

        GOOGLE_DIRECTION_API_KEY = "AIzaSyDYGryOQv5AZqMxuSWtsSH-OEAKACS0z6U"
        currentPosition =null;
        destination = {
            title: 'khtn',
            coordinates: {
                latitude: 10.7626825,
                longitude: 106.6803805
            }
        }
        this.state = {
            region: {
                latitude: 10.7893853,
                longitude: 106.6609543,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },

            markers: [destination],
            coords: []
        }


    }

    onRegionChange(region) {
        // this.setState({ region });
        console.log(region)
    }
    maker(maker) {
        console.log(maker)
    }
   
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <MapView style={{ flex: 9 / 10 }}
                    region={this.state.region}
                    onRegionChange={(region) => this.onRegionChange(region)}
                >
                    {this.state.markers.map((marker, index) => (
                        <MapView.Marker
                            key={index}
                            coordinate={marker.coordinates}
                            title={marker.title}
                        />
                    ))}
                    {currentPosition !=null && <MapViewDirections
                        origin={currentPosition.coordinates}
                        destination={destination.coordinates}
                        apikey={GOOGLE_DIRECTION_API_KEY}
                        strokeWidth={3}
                        strokeColor="red"
                    />
                    }
                </MapView>
        
            </View>

        );
    }
    componentDidMount() {
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                .then(granted => {
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        this.watchLocation();
                    }
                });

        } else {
            this.watchLocation();
        }
    }
    watchLocation() {

        // eslint-disable-next-line no-undef
        this.watchID = navigator.geolocation.getCurrentPosition((position) => {
            currentPosition = {
                title: 'me',
                coordinates: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            }
            this.setState({ markers: this.state.markers.concat(currentPosition) })


        },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
    }
    componentWillUnmount() {
        // eslint-disable-next-line no-undef
        if (this.watchID) navigator.geolocation.clearWatch(this.watchID);
    }
}
