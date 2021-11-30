import React, { useEffect } from 'react'
import {
    View, Text, TouchableOpacity, ActivityIndicator,
    StyleSheet, TouchableWithoutFeedback, ScrollView, BackHandler, Alert, KeyboardAvoidingView, Keyboard
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Navigation } from 'react-native-navigation'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ThemeProvider, Image, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Signup from '../screens/HomeScreen'
import RNExitApp from 'react-native-exit-app';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const KeyboardAvoidingComponent = () => {


    // var app = {
    //     backButtonDialog:"true"
    // };
    // if(app.backButtonDialog=="true"){




    //     const backAction = () => {

    //       Alert.alert("Hold on!", "Are you sure you want to go back?", [
    //         {
    //           text: "Cancel",
    //           onPress: () => null,
    //           style: "cancel"
    //         },
    //         { text: "YES", onPress: () => RNExitApp.exitApp() }
    //       ]);
    //       return true;
    //     }
    //     BackHandler.removeEventListener('hardwareBackPress',backAction);

    //     BackHandler.addEventListener(
    //       "hardwareBackPress",
    //       backAction
    //     );




    // }

    const signupButton = () => {

        Navigation.push('MyStack', {
            component: {
                name: 'SignupScreen',


            }
        })
    }
    return (


        <SafeAreaView

           
        >



<KeyboardAwareScrollView>
            <View style={styles.wrapper}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/images/LoginPage.png')}
                        style={{ width: wp('55%'), height: hp('35%') }}
                        PlaceholderContent={<ActivityIndicator />}
                        resizeMode='stretch'
                    />
                </View>
               
            <View style={styles.inputContainer}>



                <View style={styles.mobileView}>
                <Input style={styles.mobileNumber}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder='Enter Your Mobile Number'
                keyboardType="numeric"
                type ="number"
                leftIcon={{ type: 'font-awesome', name: 'phone', size: 20, paddingRight: 20 }}
                />
                </View>
                <View style={styles.passView}>
                <Input style={styles.pass}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                placeholder='Enter Your Password'
                secureTextEntry={true}
                keyboardType="default"
                leftIcon={{ type: 'font-awesome', name: 'lock', size: 20, paddingRight: 20 }}
                />
                </View>
             
               

                <View style={styles.loginView}>
                <Button style={styles.loginButton}
                icon={
                <Icon
                name="check"
                size={15}
                color="white"
                />
            }
                iconRight
                title="Login "
                />
                </View>

                
                </View>
                <View style={styles.signupView} >

<Text>
<Text>
Don't have an account ?</Text><Text style={{ fontWeight: "bold", fontSize: 17, color: 'green' }} onPress={() => signupButton()}> Signup</Text>
</Text>


</View>
            </View>

</KeyboardAwareScrollView>


        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
   

    wrapper: {

        flexDirection: 'column',
        height: hp('85%'),
       
        marginTop:wp('10%')
       

    },



    imageContainer: {
        height: hp('40%'),
        width: '100%',

        alignItems: "center", 



    },

    inputContainer: {


       



    },

    mobileView: {
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: wp('2.5%'),
        height: hp('4%'),
        padding: wp('5%'),
        margin: wp('4%'),


    },

    mobileNumber: {
        fontSize: 12,


    },

    passView: {
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: wp('2.5%'),
        height: hp('4%'),
        padding: wp('5%'),
        margin: wp('4%'),
    },

    pass: {
        fontSize: 12,
    },

    loginView: {
        alignItems: "center"

    },

    loginButton: {
        width: 100,

    },
    signupView: {


        justifyContent: 'flex-start',
        alignItems: "center",
        margin: 10




    },
});

export default KeyboardAvoidingComponent;