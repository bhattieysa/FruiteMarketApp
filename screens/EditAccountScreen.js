import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import InternetConnection from '../components/InternetConnection';
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { ThemeProvider, Image, Input } from 'react-native-elements';
import {
  widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ActivityIndicator, Colors,Surface } from 'react-native-paper';
import * as api from '../apis/api';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-root-toast'
import axios from 'axios';
const SignupValidationSchema = yup.object().shape({

  mobilenumber: yup.string().matches(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/, 'Phone number is not valid').required('Mobile Number Is Required'),
  name: yup.string().required('Name Is Required'),
  cnic: yup.string().required('Cnic Is Required').min(13, 'CNIC Must be at least 13 digits').max(13, 'CNIC Must be at least 13 digits'),
  //min ka function minimum length ka lia use lia ha and string ma uska error ka text ha
  // password: yup.string().min(8, ({ min }) => `Password Must be at least ${min} digits `)
  //     .required('Password Is Required').matches(
  //         /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //         "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  //     ),
  // image: yup.string().required('Image Is Required'),

});

const EditAccountScreen = (props) => {

  const [showLoading, setShowLoading] = useState(false);
  const user_id=props.id

  const token = useSelector(state => state.login_reducer.token)
  return (
    <SafeAreaView>
      <InternetConnection />
      {showLoading &&
       <View style={styles.loading}>
       <ActivityIndicator animating={true} size={'large'} color={Colors.green900} />
                  </View>
}
      <Formik
        initialValues={{ mobilenumber: props.number, name: props.name, cnic: props.cnic }}
        validateOnMount={true}

        onSubmit={values => {
         
          setShowLoading(true)
          var formData = new FormData();
          formData.append('id', user_id);
          formData.append('name', values.name);
          formData.append('cnic', values.cnic);
          formData.append('mobile_number', values.mobilenumber);
          // formData.append('pass', values.password);
          // formData.append('image_url', values.cnic + '.jpg');

          // var imageData = new FormData();

          // imageData.append('image', {
          //     uri: Platform.OS === 'android' ? `file:///${image}` : image,
          //     type: 'image/jpeg',
          //     name: values.cnic + '.jpg',
          // });


          axios({
            method: 'POST',
            url: api.EDITACCOUNT_URL,
            
            data: {
              id: user_id,
              name: values.name,
              cnic: values.cnic,
              mobile_number:values.mobilenumber

          },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            }
        })
            .then(function (response) {
                console.log("Response", JSON.stringify(response.data.error))
                if (response.data.error == "true") {
                        setShowLoading(false)
                        Toast.show('Something Went Wrong...!', {
                          duration: Toast.durations.SHORT,
                          position: Toast.positions.BOTTOM,
                          shadow: true,
                          animation: true,
                          hideOnPress: true,
                      });
                } else {
                  setShowLoading(false)
                  Toast.show('Edit Successful', {
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
            })


        }}



        validationSchema={SignupValidationSchema}
      >
           {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid, setFieldTouched, setFieldValue }) => (
        <View style={{ flexDirection: 'column' }}  >
          <View style={styles.accountView}>

            <Text style={{ fontSize: 25, fontWeight: '700' }}>Account Info</Text>


            <View style={styles.detailsView}>
              <Fontisto name="person" size={wp('7%')} />
              <View style={styles.innerDetailsView}>
                <Text style={{ fontSize: 15, fontWeight: '700' }}>Name</Text>
                <View style={styles.inputView}>
                  <Input style={styles.font}

                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder='Enter Your Name'
                    keyboardType="default"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}

                  />

                </View>
                {(errors.name && touched.name) &&
                                        <Text style={styles.errors}>{errors.name}</Text>
                                    }
              </View>
            
            </View>
  
            <View style={styles.detailsView}>
              <FontAwesome5 name="id-card" size={wp('7%')} style={{ marginRight: wp('-1%') }} />
              <View style={styles.innerDetailsView}>
                <Text style={{ fontSize: 15, fontWeight: '700' }}>CNIC</Text>
                <View style={styles.inputView}>
                  <Input style={styles.font}

                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder='Enter Your CNIC'
                    keyboardType="numeric"

                    value={values.cnic}
                    onChangeText={handleChange('cnic')}
                    onBlur={handleBlur('cnic')}
                  />

                </View>
                {(errors.name && touched.name) &&
                                        <Text style={styles.errors}>{errors.cnic}</Text>
                                    }
              </View>
            </View>
          
            <View style={styles.detailsView}>
              <FontAwesome5 name="phone" size={wp('7%')} style={{ marginRight: wp('-1%') }} />
              <View style={styles.innerDetailsView}>
                <Text style={{ fontSize: 15, fontWeight: '700' }}>Mobile Number</Text>
                <View style={styles.inputView}>
                  <Input style={styles.font}

                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder='Enter Your Mobile Number'
                    keyboardType="numeric"

                    value={values.mobilenumber}
                    onChangeText={handleChange('mobilenumber')}
                    onBlur={handleBlur('mobilenumber')}
                  />

                </View>
                {(errors.name && touched.name) &&
                                        <Text style={styles.errors}>{errors.mobilenumber}</Text>
                                    }
              </View>
            </View>
           




          </View>
          <View style={styles.logout}>

            <Button mode="contained" color='#69A03A' labelStyle={{ color: "white", fontSize: 15, fontWeight: '700' }}
                disabled={!isValid}
                onPress={handleSubmit}

              >
              Submit
            </Button>


          </View>
        </View>
           )}
      </Formik>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({

  accountView: {
    flexDirection: 'column',
    margin: wp('10%')
  }, detailsView: {

    marginLeft: wp('3%'),
    marginTop: wp('8%'),

    flexDirection: 'row'
  },
  innerDetailsView: {
    flexDirection: 'column',
    marginLeft: wp('4%'),
    flex: 1
  },
  font: {

    fontSize: 12,
  },
  inputView: {
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: wp('2.5%'),
    height: hp('4%'),
    padding: wp('5%'),
    marginTop: wp('4%'),

  },
  logout: {
    marginLeft: wp('15%'),
    marginRight: wp('15%'),
    marginTop: wp('5%')

  },
  errors: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    marginLeft: wp('3%'),
   
    marginTop: wp('1%'),

},loading: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  opacity: 0.5,
  backgroundColor: 'gray',
  justifyContent: 'center',
  alignItems: 'center',
   height:hp('90%')
},




})

export default EditAccountScreen