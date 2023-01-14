import React, { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../assets/tasklogo.png';
import {Home} from './Home';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification';


export default function SplashScreen() {
        
    const navigation= useNavigation();
    const route = useRoute();

    const edges = useSafeAreaInsets();

    //useRef permet l'initialisation unique d'un élément
    const startAnimation = useRef(new Animated.Value(0)).current;

    const scaleLogo = useRef(new Animated.Value(1)).current;
    const scaleTitle = useRef(new Animated.Value(1)).current;

    const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    const contentTransition = useRef(new Animated.Value(Dimensions.get('window').height)).current;

    useEffect(() => {
        setTimeout(() => {

            Animated.parallel([
                Animated.timing(
                    startAnimation,
                    {
                        toValue: -Dimensions.get('window').height + (edges.top + 65),
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleLogo,
                    {
                        toValue: 0.45,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleTitle,
                    {
                        toValue: 0.9,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveLogo,
                    {
                        toValue: {
                            x: (Dimensions.get("window").width / 2) - 35,
                            y: (Dimensions.get('window').height / 2) - 5
                        },
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveTitle,
                    {
                        toValue: {
                            x: 0,
                            y: (Dimensions.get('window').height / 2) - 100
                        },
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    contentTransition,
                    {
                        toValue: 0,
                        useNativeDriver: true
                    }
                )
            ])
                .start();

        }, 1000);

    }, [])


    return (

        <View style={styles.container}>
            <Animated.View style={{...styles.splash,transform: [
                    { translateY: startAnimation }
                ]}}>

                <Animated.View style={styles.nameContainer}>
                    <Animated.Image source={Logo} style={{...styles.logoImage,
                        transform: [
                            { translateX: moveLogo.x },
                            { translateY: moveLogo.y },
                            { scale: scaleLogo },

                        ]}}>
                    </Animated.Image>

                    <Animated.Text style={{...styles.appName,
                        transform: [
                            { translateY: moveTitle.y },
                            { scale: scaleTitle }
                        ]}}>
                        TaskApp
                    </Animated.Text>

                </Animated.View>
            </Animated.View>

            <Animated.View style={{...styles.menu,
                transform: [
                    { translateY: contentTransition }
                ]}}>

                <Home />  

                <View>
                    <TouchableOpacity
                        style={styles.btn_add}
                        onPress={()=>{
                            navigation.push("Nouvelle")
                        }}>
                        <Text style={styles.text_add}>Ajouter une tâche</Text>
                    </TouchableOpacity>
                </View>
                
                
                <TouchableOpacity
                  onPress={ ()=>{
                    <AlertNotificationRoot>
                    {
                        Dialog.show({
                            type: ALERT_TYPE.WARNING,
                            autoClose: 5000,
                            title: 'Droit D\'Auteurs',
                            textBody: 'Ce projet est la réalisation exclusive de : \nNyarko Marie-Stella \net \nColdheart Bill',
                            button:'Compris !'
                        })
                    }
                </AlertNotificationRoot>
                  }}>
                    <Text style={styles.text_right}>Copyright</Text>
              </TouchableOpacity>
                

            </Animated.View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    splash:{
        flex: 1,
        backgroundColor: "#0A6566",
        zIndex: 1,
        
    },
    nameContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImage:{
        width: 130,
        height: 130,
        marginBottom: 20,
    },
    appName:{
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },
    menu:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0)',
        zIndex: 0,
    },
    row:{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    text_add: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    btn_add: {
      backgroundColor: '#0A6566',
      padding: 10,
      margin: 15,
      borderRadius: 25,
      elevation: 4,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text_right:{
        color:"#0A6566",
        fontWeight:'bold',
        fontSize:20,
        marginLeft:150,
        height:30
    }

  });