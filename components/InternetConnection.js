import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';
  import {useState,useEffect,useRef} from "react";
  import NetInfo from "@react-native-community/netinfo";
const InternetConnection = () => {


    let [connected,setConnected]=useState()

    checkInternet=()=>{
        NetInfo.addEventListener(state => {
         // console.log("Connection type", state.type);
        
    
    if(state.isConnected==true){
      setConnected(true)
     
    }else{
      setConnected(false)
    }
    
        });
    
    
    
      }


      useEffect(() => {
        checkInternet()
      })

    return (
connected == false &&
        <View style={styles.internetError}>
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>No Internet Connection</Text>
        </View>
    )
}
const styles = StyleSheet.create({

    internetError: {
        backgroundColor: 'red',
        height: wp('6%'),
        justifyContent: 'center'


    }
})

export default InternetConnection