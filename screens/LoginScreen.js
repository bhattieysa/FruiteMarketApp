import React, { useEffect, useState } from 'react'
import {
    View, Text, TouchableOpacity, ActivityIndicator,
    StyleSheet, TouchableWithoutFeedback, ScrollView, BackHandler, Alert, KeyboardAvoidingView, Keyboard
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
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
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/FontAwesome5'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as yup from 'yup';
import { Formik } from 'formik';

import {
    SCLAlert,
    SCLAlertButton
} from 'react-native-scl-alert'


const LoginValidationSchema = yup.object().shape({

    mobilenumber: yup.string().matches(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/, 'Phone number is not valid').required('Mobile Number Is Required'),

    //min ka function minimum length ka lia use lia ha and string ma uska error ka text ha
    password: yup.string().min(8, ({ min }) => `Password Must be at least ${min} characters `)
        .required('Password Is Required').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),

});

const LoginScreen = () => {

    const [showPassword, setShowPassword] = useState(true)
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)
    const [showAlertError, setShowAlertError] = useState(false)
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
    const doneSuccess = () => {
        setShowAlertSuccess(false)
        Navigation.push('MyStack', {
            bottomTabs: {
                children: [
                    {
                        // TAB 1 
                        stack: {
                            children: [
                                {
                                    component: {
                                        id: '0',
                                        name: 'HomeScreen',
                                        options: {
                                            bottomTab: {
                                                text: "Home",
                                                icon: require('../assets/images/Home.png'),
                                                selectedTextColor: "#69A03A",
                                                selectedIconColor: "#69A03A",
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    },
                    {
                        // TAB 2
                        stack: {
                            children: [
                                {
                                    component: {
                                        id: '1',
                                        name: 'CartScreen',
                                        options: {
                                            bottomTab: {
                                                text: "Shopping cart",
                                                icon: require('../assets/images/Cart.png'),
                                                selectedTextColor: "#69A03A",
                                                selectedIconColor: "#69A03A",
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    },
                    {
                       // TAB 3 
                        stack: {
                            children: [
                                {
                                    component: {
                                        id: '2',
                                        name: 'FavScreen',
                                        options: {
                                            bottomTab: {
                                                text: "Favourite",
                                                icon: require('../assets/images/favrouit.png'),
                                                selectedTextColor: "#69A03A",
                                                selectedIconColor: "#69A03A",
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    },
                    {
                           // TAB 4 
                        stack: {
                            children: [
                                {
                                    component: {
                                        id: '3',
                                        name: 'MyAccountScreen',
                                        options: {
                                            bottomTab: {
                                                text: "My Account",
                                                icon: require('../assets/images/Account.png'),
                                                selectedTextColor: "#69A03A",
                                                selectedIconColor: "#69A03A",
                                            },
                                        },
                                    },
                                },
                            ],
                        },
                    },
                ],
                options: {
                    bottomTabs: {
                        titleDisplayMode: 'alwaysShow',
                    },
                },
            },
        })
    }
    return (
        <SafeAreaView>
            <Formik
                initialValues={{ mobilenumber: '', password: '' }}
                validateOnMount={true}
                onSubmit={values => {
                    //login Services for API
                    axios({
                        method: 'POST',
                        url: 'http://192.168.10.4:4000/api/users/login',
                        data: {
                            mobile_number: values.mobilenumber,
                            pass: values.password
                        },
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(function (response) {
                            console.log("Response", JSON.stringify(response.data.error))
                            if (response.data.error) {
                                setShowAlertError(true)
                            } else {
                                setShowAlertSuccess(true)
                            }
                        })
                        .catch(function (error) {
                            console.log("error", error)
                        })
                }}
                validationSchema={LoginValidationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
                    <KeyboardAwareScrollView  >
                        <View style={styles.wrapper}>
                            <View style={styles.imageContainer}>
                                <SCLAlert
                                    show={showAlertSuccess}
                                    onRequestClose={() => { setShowAlertSuccess(false) }}
                                    theme="success"
                                    title="Congratulations"
                                    useNativeDriver={true}
                                    subtitle="Login Successfull"
                                    headerIconComponent={<Ionicons name="check" size={32} color="white" />}
                                >
                                    <SCLAlertButton theme="success" onPress={() => doneSuccess()}>Done</SCLAlertButton>
                                </SCLAlert>
                                <SCLAlert
                                    show={showAlertError}
                                    onRequestClose={() => { setShowAlertError(false) }}
                                    theme="danger"
                                    title="Error"
                                    useNativeDriver={true}
                                    subtitle="Login Failed"
                                    headerIconComponent={<Ionicons name="trash" size={28} color="white" />}
                                >
                                    <SCLAlertButton theme="danger" onPress={() => { setShowAlertError(false) }}>Done</SCLAlertButton>
                                </SCLAlert>
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
                                        onChangeText={handleChange('mobilenumber')}
                                        onBlur={handleBlur('mobilenumber')}
                                        value={values.mobilenumber}
                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                        placeholder='Enter Your Mobile Number'
                                        keyboardType="numeric"
                                        type="number"
                                        leftIcon={{ type: 'font-awesome', name: 'phone', size: 20, paddingRight: 20 }}
                                        rightIcon={{ type: 'entypo', name: (!errors.mobilenumber ? 'check' : 'cross'), color: !errors.mobilenumber ? 'green' : 'red', size: 20, }}
                                    />
                                    
                                </View>
                                {(errors.mobilenumber && touched.mobilenumber) &&
                                    <Text style={styles.errors}>{errors.mobilenumber}</Text>
                                }
                                <View style={styles.passView}>
                                    <Input style={styles.pass}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                        placeholder='Enter Your Password'
                                        secureTextEntry={showPassword}
                                        keyboardType="default"
                                        leftIcon={{ type: 'font-awesome', name: 'lock', size: 20, paddingRight: 20 }}
                                        rightIcon={{ type: 'font-awesome', name: (showPassword ? 'eye-slash' : 'eye'), size: 20, onPress: () => setShowPassword(!showPassword) }}

                                    />
                                </View>
                                {(errors.password && touched.password) &&
                                    <Text style={styles.errors}>{errors.password}</Text>
                                }
                                <View style={styles.loginView}>
                                    <Button
                                        disabled={!isValid}
                                        onPress={handleSubmit}
                                        buttonStyle={styles.loginButton}

                                        // icon={
                                        //     <Icon
                                        //         name="check"
                                        //         size={15}
                                        //         color="white"
                                        //     />
                                        // }
                                        // iconRight
                                        title="Login "
                                    />
                                </View>
                            </View>
                            <View style={styles.signupView} >
                                <Text>
                                    <Text>
                                        Don't have an account ?</Text><Text style={{ fontWeight: "bold", fontSize: 17, color: '#69A03A' }} onPress={() => signupButton()}> Signup</Text>
                                </Text>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                )}
            </Formik>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        height: hp('85%'),
        marginTop: wp('10%')
    },
    imageContainer: {
        height: hp('40%'),
        width: '100%',
        alignItems: "center",
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
        width: wp('25%'),
        marginTop: wp('4%'),
        backgroundColor: '#69A03A'
    },
    signupView: {
        justifyContent: 'flex-start',
        alignItems: "center",
        margin: 10
    },
    errors: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
        marginLeft: wp('4%'),
        marginBottom: wp('4%'),
        marginTop: wp('-4%'),
    },
});
export default LoginScreen;