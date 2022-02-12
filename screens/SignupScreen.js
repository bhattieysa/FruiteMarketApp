import React, { useEffect, useState, useRef } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, LogBox ,TouchableOpacity} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ThemeProvider, Image, Input } from 'react-native-elements';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import {
    SCLAlert,
    SCLAlertButton
} from 'react-native-scl-alert'
import Ionicons from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons'
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const SignupValidationSchema = yup.object().shape({

    mobilenumber: yup.string().matches(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/, 'Phone number is not valid').required('Mobile Number Is Required'),
    name: yup.string().required('Name Is Required'),
    cnic: yup.string().required('Cnic Is Required').min(13, 'CNIC Must be at least 13 digits').max(13, 'CNIC Must be at least 13 digits'),
    //min ka function minimum length ka lia use lia ha and string ma uska error ka text ha
    password: yup.string().min(8, ({ min }) => `Password Must be at least ${min} digits `)
        .required('Password Is Required').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),

});


const SignupScreen = () => {

    const [showPassword, setShowPassword] = useState(true)
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)
    const [showAlertError, setShowAlertError] = useState(false)
    const actionSheet = useRef()
    const optionArray = [
        'Take Photo', 'Choose from Library', 'Cancel'
    ]
    const showActionSheet = () => {
        actionSheet.current.show()
    }

    return (
        <SafeAreaView>
            <Formik
                initialValues={{ mobilenumber: '', password: '', name: '', cnic: '' }}
                validateOnMount={true}
                onSubmit={values => {
                    //login Services for API

                    axios({
                        method: 'POST',
                        url: 'http://localhost:4000/api/users',
                        data: {
                            name: values.name,
                            cnic: values.cnic,
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
                validationSchema={SignupValidationSchema}
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
                                    subtitle="Signup Successfull"
                                    headerIconComponent={<Ionicons name="check" size={32} color="white" />}
                                >
                                    <SCLAlertButton theme="success" onPress={() => { setShowAlertSuccess(false) }}>Done</SCLAlertButton>

                                </SCLAlert>
                                <SCLAlert
                                    show={showAlertError}
                                    onRequestClose={() => { setShowAlertSuccess(false) }}
                                    theme="danger"
                                    title="Error"
                                    useNativeDriver={true}
                                    subtitle="User Already Exist"
                                    headerIconComponent={<Ionicons name="trash" size={28} color="white" />}
                                >
                                    <SCLAlertButton theme="danger" onPress={() => { setShowAlertError(false) }}>Done</SCLAlertButton>

                                </SCLAlert>
                                <Image
                                    source={require('../assets/images/LoginPage.png')}
                                    style={{ width: wp('50%'), height: hp('30%') }}
                                    PlaceholderContent={<ActivityIndicator />}
                                    resizeMode='stretch'
                                />
                            </View>

                            <View style={styles.inputContainer}>

                                <Text style={styles.label}>Full Name</Text>
                                <View style={styles.inputView}>

                                    <Input style={styles.input}

                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}

                                        value={values.name}
                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                        placeholder='Enter Your Name'
                                        keyboardType="default"

                                        leftIcon={{ type: 'font-awesome', name: 'user', size: 20, paddingRight: 20 }}

                                    />

                                </View>
                                {(errors.name && touched.name) &&
                                    <Text style={styles.errors}>{errors.name}</Text>
                                }
                                <Text style={styles.label}>CNIC</Text>
                                <View style={styles.inputView}>

                                    <Input style={styles.input}

                                        onChangeText={handleChange('cnic')}
                                        onBlur={handleBlur('cnic')}

                                        value={values.cnic}
                                        inputContainerStyle={{ borderBottomWidth: 0 }}
                                        placeholder='Enter Your Cnic'
                                        keyboardType="default"

                                        leftIcon={{ type: 'font-awesome', name: 'id-card', size: 20, paddingRight: 20 }}
                                        rightIcon={{ type: 'entypo', name: (!errors.cnic ? 'check' : 'cross'), color: !errors.cnic ? 'green' : 'red', size: 20, }}

                                    />

                                </View>
                                {(errors.cnic && touched.cnic) &&
                                    <Text style={styles.errors}>{errors.cnic}</Text>
                                }
                                <Text style={styles.label}>Mobile Number</Text>
                                <View style={styles.inputView}>

                                    <Input style={styles.input}
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
                                <Text style={styles.label}>Password</Text>
                                <View style={styles.inputView}>
                                    <Input style={styles.input}

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
                                <Text style={styles.label}>Upload Image</Text>
                                <View style={styles.imageView}>

                                    <MaterialCommunityIcons name="image" style={styles.imageIcon} onPress={() => { SheetManager.show("helloworld_sheet");}} size={60} />

                                </View>



                                <View style={styles.signupView}>
                                    <Button
                                        disabled={!isValid}
                                        onPress={handleSubmit}

                                        buttonStyle={styles.signupButton}

                                        // icon={
                                        //     <Icon
                                        //         name="check"
                                        //         size={15}
                                        //         color="white"
                                        //     />
                                        // }
                                        // iconRight
                                        title="Signup"
                                    />
                                </View>


                            </View>

                        </View>
                    </KeyboardAwareScrollView>
                )}
            </Formik>
            <ActionSheet id="helloworld_sheet" >
            <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} >
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} >
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() =>  SheetManager.hide("helloworld_sheet")}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
            </ActionSheet>
        </SafeAreaView>


    )
}

const styles = StyleSheet.create({


    wrapper: {

        flexDirection: 'column',
        height: hp('100%'),
    },

    imageContainer: {
        height: hp('30%'),
        width: '100%',
        alignItems: "center",
        marginTop: wp('3%'),


    },

    input: {
        fontSize: 12,
    },

    inputView: {
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: wp('2.5%'),
        height: hp('4%'),
        padding: wp('5%'),
        marginBottom: wp('4%'),
        marginLeft: wp('4%'),
        marginRight: wp('4%'),
        marginTop: wp('2%'),
    },
    imageView: {

        alignItems: 'center',


    },
    imageIcon: {

        alignItems: 'center',
        marginBottom: wp('4%'),

    },

    label: {
        paddingLeft: wp('5%'),
        fontWeight: 'bold',

    },

    signupView: {
        alignItems: "center",
        marginTop: wp('4%'),
        marginTop: wp('10%'),
    },

    signupButton: {

        width: wp('25%'),
        height: wp('10%'),
        backgroundColor: '#69A03A',

    },
    errors: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
        marginLeft: wp('4%'),
        marginBottom: wp('4%'),
        marginTop: wp('-4%'),

    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 15,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
       
      },
      panelHeader: {
        alignItems: 'center',
      },

      panelTitle: {
        fontSize: 27,
        height: 35,
      },
      panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
      },
      panelButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 3,
      },
      panelButtonTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
      },

});

export default SignupScreen;