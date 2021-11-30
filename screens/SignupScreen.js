import React, { useEffect } from 'react'
import {
    View, Text, TouchableOpacity, ActivityIndicator,
    StyleSheet,TouchableWithoutFeedback, ScrollView, BackHandler, Alert, KeyboardAvoidingView, Keyboard
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Navigation } from 'react-native-navigation'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ThemeProvider, Image, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Signup from '../screens/HomeScreen'
import RNExitApp from 'react-native-exit-app';
const KeyboardAvoidingComponent = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View  style={styles.container1}>
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
                <View style={styles.passView}>
                    <Input style={styles.pass}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        placeholder='Enter Your Password'
                        secureTextEntry={true}
                        keyboardType="default"

                        leftIcon={{ type: 'font-awesome', name: 'phone', size: 20, paddingRight: 20 }}

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
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
  },

  container1:{
    flexDirection: 'column',flex:1,

  
    alignItems:'stretch'

  },



imageContainer: {
  flex:2,
    width: '100%',
    alignItems: "center",
    
},

inputContainer: {
   
   
   



},

mobileView: {
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

passView: {
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 10,
    height: 40,
    padding: 20,
    margin: 15
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


    justifyContent: 'center',
    alignItems: "center",
    marginBottom: 10,

},
});

export default KeyboardAvoidingComponent;