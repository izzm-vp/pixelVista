import { BlurView } from "expo-blur";
import { ActivityIndicator, Button, Pressable, StyleSheet, Text, View } from "react-native";
import { hp, wp } from "../../helpers/common";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { useState } from "react";
import { theme } from "../../constants/theme";
import { Entypo, Octicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Toast from 'react-native-toast-message';



export default function ImageScreen() {


    const router = useRouter()
    const item = useLocalSearchParams();
    const [status, setStatus] = useState("")
    let uri = item?.webformatURL;
    const fileName = item?.previewURL?.split('/').pop();
    const imageURL = uri;
    const filePath = `${FileSystem.documentDirectory}${fileName}`
    const onLoad = () => {
        setStatus("loading");
    }

    const getSize = () => {
        if (!item || !item.imageWidth || !item.imageHeight) {
            return { width: 100, height: 100 };
        }

        const aspectRatio = item.imageWidth / item.imageHeight;
        const maxWidth = wp(92);

        let width, height;

        if (aspectRatio >= 1) {
            width = maxWidth;
            height = width / aspectRatio;
        } else {
            height = maxWidth;
            width = height * aspectRatio;
        }

        return { width, height };
    };
    const handleDownLoad = async () => {
        setStatus("downloading")
        let uri = await downloadFile();
        if(uri){
            showToast("Image downloaded !")
        }
    }
    const handleShare = async () => {
        setStatus("sharing");
        let uri = await downloadFile();

        if (uri) {
            await Sharing.shareAsync(uri)
        }
    }
    const downloadFile = async () => {

        try {
            const { uri } = await FileSystem.downloadAsync(imageURL, filePath);
            setStatus("")
            console.log(uri)
            return uri;
        } catch (error) {
            setStatus("")
            console.log("error :", error);

        }
    }

    const showToast = (message) => {
        Toast.show({
          type: 'success',
          text1: message,
          position:"bottom"
        });
    }
    const ToastConfig={
        success:({text1,props,...rest})=>{
            return <View style={styles.toast}>

                <Text style={styles.toastT}>
                         {text1}
                </Text>

            </View>
        }

    }
    return (
        <BlurView style={styles.container} tint="dark" intensity={60}>

            <View style={getSize()}>
                <View style={styles.loading}>
                    {
                        status == "loading" && <ActivityIndicator color={"white"} size={"large"} />
                    }
                </View>
                <Image transition={100} style={[styles.image, getSize()]} source={{ uri }} onLoad={onLoad} />
            </View>
            <View >
                <Animated.View entering={FadeInDown.springify()} style={styles.buttons} >
                    <Pressable style={styles.button} onPress={() => router.back()}>
                        <Octicons name="x" size={24} color={"white"} />
                    </Pressable>
                    {
                        status === "downloading" ? (
                            <View style={styles.button}>
                                <ActivityIndicator size={'small'} color={"white"} />
                            </View>
                        ) : (
                            <Pressable style={styles.button}>
                                <Octicons name="download" onPress={handleDownLoad} size={24} color={"white"} />
                            </Pressable>
                        )
                    }
                    {
                        status === "sharing" ? (
                            <View style={styles.button}>
                                <ActivityIndicator size={'small'} color={"white"} />
                            </View>
                        ) : (
                            <Pressable style={styles.button}>
                                <Entypo name="share" onPress={handleShare} size={24} color={"white"} />
                            </Pressable>
                        )
                    }



                </Animated.View>
            </View>
            <Toast config={ToastConfig} visibilityTime={2500}/>
        </BlurView >
    )

}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHozizontal: wp(4)

        },
        image: {
            borderRadius: theme.radius.lg,
            borderWidth: 2,
            backgroundColor: "rgba(255,255,255,0.1)",
            borderColor: "rgba(255,255,255,0.1)",
        },
        loading: {
            position: "absolute",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            alignItems: "center",

        },
        buttons: {
            marginTop: 40,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 50
        },
        button: {
            height: hp(6),
            width: hp(6),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: theme.radius.sm

        },
        toast:{
            padding:15,
            paddingHorizontal:30,
            borderRadius:theme.radius.xl,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:"rgba(255,255,255,0.15)"
        },
        toastT:{
            fontSize:hp(1.8),
            fontWeight:theme.fontWeights.semibold,
            color:theme.colors.white
        }
    }
)