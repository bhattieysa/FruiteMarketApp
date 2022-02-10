import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome5'
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { RNNDrawer } from "react-native-navigation-drawer-extension";
const Header = () => {

    const openDrawer = () => {

        RNNDrawer.showDrawer({
            component: {
                name: "CustomDrawer",

            }
        })


    }



    return (
        <View style={styles.container}>
            <View style={styles.headerItems}>
                <Ionicons name="bars" size={25} color="white" onPress={() => openDrawer()} />
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>Fruite Market</Text>
            </View>
        </View>

    );
}
const styles = StyleSheet.create({

    container: {

        width: '100%',
        height: '15%',
        flexDirection: 'row',
        backgroundColor: '#69A03A',






    },
    headerItems: {
       
        marginLeft: wp('1.5%'),
        marginTop: wp('4%'),
        


    },
    nameContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent:'center',
        marginRight: wp('6%'),
        marginTop: wp('3%'),


    },
    name: {
       
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: wp('4%'),







    },


})

export default Header;