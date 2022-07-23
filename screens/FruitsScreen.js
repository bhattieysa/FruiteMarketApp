import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet,FlatList,ToastAndroid, Alert  } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as api from '../apis/api';
import { Navigation } from 'react-native-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native-elements';
import Header from '../components/Header';
import InternetConnection from '../components/InternetConnection';
import { useState, useEffect, useRef } from "react";
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
const FruiteScreen = (props) => {

    const [API, setAPI] = useState(true);
    const [Like, setLike] = useState(false);
    const userId = useSelector(state => state.login_reducer.userId)
    const token = useSelector(state => state.login_reducer.token)
    const [API_DATA, setAPI_DATA] = useState('');
    if (API) {



        axios({

            method: 'POST',
            url: api.HOME_NUTRITION_FRUITES_URL,

            data: {

                fruite_id: props.id


            },
            responseType: 'json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            }
        })
            .then(function (response) {

                


                setAPI_DATA(response.data)
                setAPI(false)

            })
            .catch(function (error) {

                console.log("error", error)
            })






    }
    function AddToCart(fruite_id){


axios({

    method: 'POST',
    url: api.HOME_ADDTOCART_FRUITES_URL,

    data: {

        fruite_id: fruite_id,
        user_id:userId


    },
    responseType: 'json',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token
    }
})
    .then(function (response) {

        if (Platform.OS === 'android') {
            ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
          } else {
            Alert.alert(response.data.message);
          }
    })
    .catch(function (error) {

        console.log("error", error)
    })



    }



    return (
        <SafeAreaView style={{ flex: 1 }}>

            <InternetConnection />
            <View style={{ flex: 1, margin: wp('3%') }}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: props.image }}
                        style={{ width: wp('93%'), height: hp('20%'), borderRadius: 10 }}
                        // PlaceholderContent={<ActivityIndicator />}
                        resizeMode='center'

                    />

                </View>
                <Text style={styles.fruiteTitle}>{props.name}</Text>
                <Text style={styles.details}>{props.details}</Text>

                <View style={styles.nutrition}>
                    <Text style={styles.fruiteTitle}>Nutrition</Text>
                    <FlatList
                       
                        pagingEnabled={true}
                    
                        legacyImplementation={false}
                        data={API_DATA}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <View style={{paddingTop:11,paddingBottom:11}}>
<Text style={{color:'#393939'}}>{'\u25CF'}  <Text style={{color:'#393939',fontSize:15}}> {item.name}</Text></Text>
                            </View>

                        }
                    />
                </View>

                <View style={styles.priceSection}>

                    <Text style={styles.price} >{props.price}Rs Per/Kg</Text>

                    <Button mode="contained" color='#69A03A' labelStyle={{ color: "white", fontSize: 13, fontWeight: '700' }}
                        // disabled={!isValid}
                        // onPress={handleSubmit}
                        style={{ alignSelf: 'baseline', paddingTop: wp('0.5%'), paddingBottom: wp('0.5%'), paddingLeft: wp('5%'), paddingRight: wp('5%'), borderRadius: 7 }}
onPress={()=>{AddToCart(props.id)}}
                    >
                        Add To Cart
                    </Button>
                </View>

            </View>
        </SafeAreaView>
    )
}

// Navigation.setDefaultOptions({
//   topBar: {
//     visible: true,
//     drawBehind: false,
//     animate: true,
//   }
// });


const styles = StyleSheet.create({

    imageContainer: {

        alignItems: 'center',


    },
    nutrition: {
        flex: 1,
        marginTop: wp('2%')

    },
    fruiteTitle: {
        fontSize: 23,
        color: 'black',
        fontWeight: 'bold',
        marginTop: hp('1%'),

    },
    priceSection: {

       

        alignItems: 'center',
        justifyContent:'center',

        flexDirection: 'row',
       


    },
    price: {
        fontSize: 20,

        textAlign: 'left',
        flex: 1,


    },
    details: {
        marginLeft: wp('3%'),
        marginTop: wp('2%'),
        color: '#626262'
    },




})


export default FruiteScreen
