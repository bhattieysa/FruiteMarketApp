import React from 'react';
import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, AppState, StyleSheet, FlatList, ImageBackground, Dimensions,ToastAndroid, Alert } from 'react-native'
import axios from 'axios';
import * as api from '../apis/api';
import Ionicons from 'react-native-vector-icons/FontAwesome5'
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { RNNDrawer } from "react-native-navigation-drawer-extension";
import { Image } from 'react-native-elements';
import { ActivityIndicator, Colors, Surface } from 'react-native-paper';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-root-toast'

const LikeFruite = ({fruite_id,like,buttomPressEvent}) => {


   
    const token = useSelector(state => state.login_reducer.token)
    const userId = useSelector(state => state.login_reducer.userId)
   
   






    

    function LikeButtonAddTrue(user_id,fruite_id){
       


        axios({

            method: 'POST',
            url: api.HOME_LIKE_FRUITES_URL,

            data: {
                user_id: user_id,
                fruite_id: fruite_id


            },
            responseType: 'json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            }
        })
            .then(function (response) {

               
                
                    // Toast.show(response.data.message, {
                    //     duration: Toast.durations.LONG,
                    //     position: Toast.positions.BOTTOM,
                    //     shadow: true,
                    //     animation: true,
                    //     hideOnPress: true,
                    // });
                    if (Platform.OS === 'android') {
                        ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
                      } else {
                        Alert.alert(response.data.message);
                      }



            })
            .catch(function (error) {

                console.log("error5", error)
            })




    }
    function LikeButtonAddFalse(user_id,fruite_id){
       


        axios({

            method: 'POST',
            url: api.HOME_UNLIKE_FRUITES_URL,

            data: {
                user_id: user_id,
                fruite_id: fruite_id


            },
            responseType: 'json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            }
        })
            .then(function (response) {

               
                
                    // Toast.show(response.data.message, {
                    //     duration: Toast.durations.LONG,
                    //     position: Toast.positions.BOTTOM,
                    //     shadow: true,
                    //     animation: true,
                    //     hideOnPress: true,
                    // });
                    if (Platform.OS === 'android') {
                        ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
                      } else {
                        Alert.alert(response.data.message);
                      }



            })
            .catch(function (error) {

                console.log("error5", error)
            })




    }


    return (

        <View style={styles.likeBg}>

            {like ? (
                <TouchableOpacity activeOpacity={.5} onPress={()=>buttomPressEvent(userId,fruite_id,like )}>
                    <Image

                        source={require('../assets/images/heart.png')}
                        style={{ width: hp('2%'), height: hp('2%') }}
                        // PlaceholderContent={<ActivityIndicator />}


                    />
                </TouchableOpacity>
            ) : (

                <TouchableOpacity activeOpacity={.5} onPress={()=>buttomPressEvent(userId, fruite_id,like)}>
                    <Image

                        source={require('../assets/images/half_heart.png')}
                        style={{ width: hp('2%'), height: hp('2%') }}
                        // PlaceholderContent={<ActivityIndicator />}

                    />
                </TouchableOpacity>
            )}

        </View>
    )
};
const styles = StyleSheet.create({
    likeBg: {

        borderRadius: hp('4%') / 2,
        height: hp('4%'),
        width: hp('4%'),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
      }
})

export default LikeFruite
