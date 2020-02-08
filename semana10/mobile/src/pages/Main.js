import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';

//dever de casa:
//jogar o form de busca pra cima qunado clicar no teclado cosnumindo api do teclado do expo
//pega altura dele e joga o input pra cima

function Main({ navigation }) {
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                });
            }
        }
        
        loadInitialPosition();
    }, [])

    async function loadDevs(){
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs,
            }
        });

        setDevs(response.data.devs);
    }

    function handleRegionChanged(region) {
        setCurrentRegion(region);
    }

    if (!currentRegion) {
        return null;
    }

    return (
        <>
            <MapView onRegionChangeComplete={handleRegionChanged} 
            initialRegion={currentRegion} 
            style={[styles.map]}>
                {devs.map( dev => 
                    <Marker
                        key={dev._id}
                        coordinate={{
                        latitude: dev.location.coordinates[1],
                        longitude: dev.location.coordinates[0],
                        }}
                    >
                    <Image 
                    style={styles.avatar} 
                    source={{ uri: dev.avatar_url }} />

                    <Callout onPress={() => {
                        navigation.navigate('Profile', { github_username: dev.github_username })
                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.devName} > {dev.name} </Text>
                            <Text style={styles.devBio} > {dev.bio} </Text>
                            <Text style={styles.devTechs}> {dev.techs.join(', ')} </Text>
                        </View>
                    </Callout>
                </Marker>
                )}
            </MapView>
            <View style={styles.searchForm} >
                <TextInput 
                style={styles.searchInput} 
                placeholder="Buscar devs por techs..."
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={setTechs}
                />
            <TouchableOpacity onPress={loadDevs} style={styles.loadButton} >
                <MaterialIcons name="my-location" size={20} color="#fff" />
            </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    map: {
    //...StyleSheet.absoluteFillObject,
        flex: 1,
        /*position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,*/
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 8,
        borderWidth: 4,
        borderColor: '#fff',
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio: {
        color:'#666',
        marginTop: 5,
    }, 
    devTechs: {
        marginTop: 5, 
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            wisth: 4,
            height: 4,
        },
        elevation: 2,
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 25,
    },
})

export default Main;