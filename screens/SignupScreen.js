import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, LogBox, TouchableOpacity, ImageBackground, ScrollView, } from 'react-native'
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
import ImagePicker from 'react-native-image-crop-picker';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
import { ActivityIndicator, Colors,Surface } from 'react-native-paper';
import * as api from '../apis/api';
import Toast from 'react-native-root-toast'


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
    image: yup.string().required('Image Is Required'),

});


const SignupScreen = () => {

    const [showPassword, setShowPassword] = useState(true)
    const [showAlertSuccess, setShowAlertSuccess] = useState(false)
    const [showAlertError, setShowAlertError] = useState(false)
    const [image, setImage] = useState(null);
    const [showLoading, setShowLoading] = useState(false);



    return (
        
        <SafeAreaView style={{flex:1}} >
            {showLoading &&
       <View style={styles.loading}>
       <ActivityIndicator animating={true} size={'large'} color={Colors.green900} />
                  </View>
}

            <Formik
                initialValues={{ mobilenumber: '', password: '', name: '', cnic: '', image: '' }}
                validateOnMount={true}

                onSubmit={values => {
                    //login Services for API
                 
                    setShowLoading(true)
                    var formData = new FormData();
                    formData.append('name', values.name);
                    formData.append('cnic', values.cnic);
                    formData.append('mobile_number', values.mobilenumber);
                    formData.append('pass', values.password);
                    formData.append('image_url', values.cnic + '.jpg');

                    var imageData = new FormData();

                    imageData.append('image', {
                        uri: Platform.OS === 'android' ? `file:///${image}` : image,
                        type: 'image/jpeg',
                        name: values.cnic + '.jpg',
                    });


                    axios({
                        method: 'POST',
                        url: api.SIGNUP_URL,
                        data: formData,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                        .then(function (response) {
                            console.log("Response", JSON.stringify(response.data.error))
                            if (response.data.error == "true") {
                                    setShowLoading(false)
                                    Toast.show('Something Wrong', {
                                        duration: Toast.durations.SHORT,
                                        position: Toast.positions.BOTTOM,
                                        shadow: true,
                                        animation: true,
                                        hideOnPress: true,
                                    });
                            } else {
                                axios({
                                    method: 'POST',
                                    url: api.IMAGEUPLOAD_URL,
                                    data: imageData,
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'multipart/form-data'
                                    }
                                })
                                    .then(function (response) {
                                       
                                        setShowLoading(false)
                                        if (response.data.error != "true") {
                                            Toast.show('Signup Successful', {
                                                duration: Toast.durations.SHORT,
                                                position: Toast.positions.BOTTOM,
                                                shadow: true,
                                                animation: true,
                                                hideOnPress: true,
                                            });
                                           
                                        }
                                    })
                                    .catch(function (error) {
                                        console.log("error", error)
                                        setShowLoading(false)
                                        Toast.show('Internet Error', {
                                            duration: Toast.durations.SHORT,
                                            position: Toast.positions.BOTTOM,
                                            shadow: true,
                                            animation: true,
                                            hideOnPress: true,
                                        });
                                    })

                            }

                        })
                        .catch(function (error) {
                            console.log("error", error)
                        })



                }}
                validationSchema={SignupValidationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid, setFieldTouched, setFieldValue }) => (

                    <View>


                        <KeyboardAwareScrollView  >

                            <View style={styles.wrapper}>




                                <View style={styles.imageContainer}>


                                
                                    <Image
                                        source={require('../assets/images/LoginPage.png')}
                                        style={{ width: wp('45%'), height: hp('25%') }}
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
                                    {(errors.image && touched.image)
                                     &&
                                        <Text style={styles.errorsImage}>{errors.image}</Text>
                                    }
                                 
                                    <View style={{ alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => { 
                                          setFieldTouched('image', true)
                                            SheetManager.show("upload_image_sheet"); 
                                            }} >
                                            <ImageBackground
                                                // source={require('../assets/images/Home.png')}
                                                source={{
                                                    uri: image,

                                                }}

                                                style={{ height: hp('10%'), width: wp('20%'), }}
                                                touched
                                                imageStyle={{ borderRadius: 15 }}>
                                                {


                                                    (image == null) && (

                                                        <View
                                                            style={{
                                                                flex: 1,
                                                                justifyContent: 'center',
                                                                alignItems: 'center',

                                                            }}>
                                                            <MaterialCommunityIcons
                                                                name="image"
                                                                size={50}
                                                                onPress={() => { 
                                                                    setFieldTouched('image', true)
                                                                    SheetManager.show("upload_image_sheet"); }}
                                                                style={styles.imageIcon
                                                                }
                                                            />
                                                        </View>
                                                         
                                                    )

                                                               
                                                }
                                            </ImageBackground>

                                        </TouchableOpacity>
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
                        <ActionSheet id="upload_image_sheet" >
                            <View style={styles.panel}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.panelTitle}>Upload Photo</Text>
                                    <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
                                </View>
                                <TouchableOpacity style={styles.panelButton} onPress={() => {

                                    ImagePicker.openCamera({
                                        compressImageMaxWidth: 300,
                                        compressImageMaxHeight: 300,
                                        cropping: true,
                                        compressImageQuality: 0.7
                                    }).then(image => {
                                        setImage(image.path);
                                        SheetManager.hide("upload_image_sheet")
                                        setFieldValue('image', image.path)

                                    }).catch(error => {
                                        if (error.code === 'E_PICKER_CANCELLED') {
                                            return false;
                                        }
                                    });
                                   
                                  


                                }} >
                                    <Text style={styles.panelButtonTitle} >Take Photo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.panelButton} onPress={() => {

                                    ImagePicker.openPicker({
                                        width: 300,
                                        height: 300,
                                        cropping: true,
                                        compressImageQuality: 0.7
                                    }).then(image => {

                                        setImage(image.path);
                                        SheetManager.hide("upload_image_sheet")

                                        setFieldValue('image', image.path)
                                    }).catch(error => {
                                        if (error.code === 'E_PICKER_CANCELLED') {
                                            return false;
                                        }
                                    });



                                }} >
                                    <Text style={styles.panelButtonTitle} >Choose From Library</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.panelButton}
                                    onPress={() => SheetManager.hide("upload_image_sheet")}>
                                    <Text style={styles.panelButtonTitle}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </ActionSheet>
                    </View>
                )}
            </Formik>

        </SafeAreaView>


    )
}

const styles = StyleSheet.create({


    wrapper: {

        flexDirection: 'column',

    },

    imageContainer: {
        height: hp('25%'),
        width: '100%',
        alignItems: "center",
        marginTop: wp('6%')




    },



    input: {
        fontSize: 12,
    },

    inputView: {
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: wp('2.5%'),
        height: hp('3%'),
        padding: wp('5%'),
        marginBottom: wp('4%'),
        marginLeft: wp('4%'),
        marginRight: wp('4%'),

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

        marginTop: wp('5%'),
        marginBottom: wp('5%')
    },

    signupButton: {

        width: wp('25%'),
        height: hp('6%'),
        backgroundColor: '#69A03A',

    },
    errors: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
        marginLeft: wp('4%'),
        marginBottom: wp('3%'),
        marginTop: wp('-4%'),

    },
    errorsImage: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
        marginLeft: wp('5%'),

        marginTop: wp('1%'),

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
    },loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },

});


export default SignupScreen;