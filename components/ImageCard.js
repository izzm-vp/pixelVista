import { Pressable, StyleSheet} from "react-native";
import { Image } from 'expo-image';
import { getImageSize, wp } from "../helpers/common";
import { theme } from "../constants/theme";
export default function ImageCard({ item, index, route }) {

const getImageHeight=()=>{
    let {imageHeight:height,imageWidth:width}=item;

    return {height:  getImageSize(height,width)} ;
}
    return (
        <Pressable onPress={()=>route.push({pathname:"home/image",params:{...item}})} style={styles.imageWrapper }>
            <Image
                style={[styles.image,getImageHeight()]}
                source={item?.webformatURL}
                transition={100}
            />

        </Pressable>
    )
}



const styles = StyleSheet.create({
    image: {
        height: 300,
        width: "100%"
    },
    imageWrapper:{
        backgroundColor:theme.colors.grayBG,
        borderRadius:theme.radius.xl,
        borderCurve:"continuous,",
        overflow:"hidden",
        marginBottom:wp(2),
        
        marginRight:wp(2)
    },
})