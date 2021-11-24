import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Navigation } from 'react-native-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ThemeProvider, Image, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignupScreen = () => {




    return (
        <SafeAreaView
            style={styles.safeArea}>


            <View style={styles.container}  >

                {/*  Image with custom placeholder content */}

                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/images/LoginPage.png')}
                        style={{ width: 246, height: 253 }}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.mobileView}>
                        <Input style={styles.mobileNumber}
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                            placeholder='Enter Your Mobile Number'


                            keyboardType="numeric"

                            type="number"
                            leftIcon={{ type: 'font-awesome', name: 'phone', size: 20, paddingRight: 20 }}
                        />

                    </View>
                    <View style={styles.mobileView}>
                        <Input style={styles.mobileNumber}
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                            placeholder='Enter Your Mobile Number'


                            keyboardType="numeric"

                            type="number"
                            leftIcon={{ type: 'font-awesome', name: 'phone', size: 20, paddingRight: 20 }}
                        />

                    </View>

                </View>
            </View>

        </SafeAreaView>
    )
}



export default SignupScreen
//......................Styles.....................
const styles = StyleSheet.create({


    container: {


        flexDirection: "column",
        paddingTop: 55,
        height: '100%',

    },
    imageContainer: {
        flex: 1.5,
        width: '100%',
        alignItems: "center",




    },
    inputContainer: {
        flex: 1,
        width: '100%'

    },

    mobileView: {

        flexDirection: 'column',
        justifyContent: 'center',

        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 10,
        height: 40,
        padding: 20,
        margin: 15

    },
    mobileNumber: {

        fontSize: 12,



    },
})

const theme = {

};