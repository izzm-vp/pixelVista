import React from "react";
import { View, Text, StatusBar, Image, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import  Animated ,{FadeInDown} from "react-native-reanimated";
import { hp } from "../helpers/common";
import { theme } from "../constants/theme";
import {useRouter} from "expo-router";
export default function WelcomeHome() {

    const router=useRouter()
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image source={{ uri: "https://img.freepik.com/free-photo/2d-graphic-wallpaper-with-colorful-grainy-gradients_23-2151001558.jpg?t=st=1714824312~exp=1714827912~hmac=105d029693783888da99139bc7ed7b72e755cbb9852fc00d6f399ebb19d70eb5&w=360" }} style={styles.image} />
           <Animated.View entering={FadeInDown.duration(600)} style={{flex:1}}>
           <LinearGradient
                colors={['rgba(255,255,255,0)','rgba(255,255,255,0.5)','white','white']}
                style={styles.grad}
                start={{x:0.5,y:0}}
                end={{x:0.5,y:1}}
            />
            <View style={styles.contContainer}>
            <Animated.Text entering={FadeInDown.delay(400).springify()} style={styles.title}>
            Pixel Vista
                </Animated.Text>
                <Animated.Text entering={FadeInDown.delay(500).springify()} style={styles.punch}>
                Bringing Clarity to Every Pixel
                </Animated.Text>
                <Animated.View entering={FadeInDown.delay(600).springify()}>
                    <Pressable onPress={()=>{router.push("home")}} style={styles.Sbutton}>
                        <Text style={styles.Stext}>
                            Start Explore
                        </Text>

                    </Pressable>
                </Animated.View>
            </View>
           </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    grad: {
        width: "100%",
        height: "65%",
        position: "absolute",
        bottom:0
    },
    contContainer: {
        flex:1,
        alignItems:"center",
        justifyContent:"flex-end",
        gap:14
    },
    title:{
        fontSize:hp(7),
        color:theme.colors.neutral(0.9),
        fontWeight:theme.fontWeights.bold
    },
    punch:{
        fontSize:hp(2),
        letterSpacing:1,
        marginBottom:10,
        fontWeight:theme.fontWeights.medium,
    } ,
    Sbutton:{
        marginBottom:50,
        backgroundColor:theme.colors.neutral(0.9),
        padding:15,
        paddingHorizontal:90,
        borderRadius:theme.radius.xl,
        borderCurve:"continuous"

    },
    Stext:{
        color:theme.colors.white,
        fontSize:hp(3),
        fontWeight:theme.fontWeights.medium,
letterSpacing:1
    }



});
