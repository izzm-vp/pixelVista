import { StyleSheet, Text, View } from "react-native";
import ImageCard from "./ImageCard";

import { MasonryFlashList } from "@shopify/flash-list";
import { wp } from "../helpers/common";


export default function ImagesGrid({route,images}){



    return <View style={styles.container}>
  <MasonryFlashList
      data={images}
      numColumns={2}
      initialNumToRender={1000}
      contentContainerStyle={styles.listContainerStl}
      renderItem={({ item , index }) => <ImageCard route={route} index={index} item={item}/>}
      estimatedItemSize={200}
    />
    </View>
}

const styles=StyleSheet.create({
container:{
    minHeight:3,
    width:"100%"
},
listContainerStl:{
    paddingHorizontal:wp(4)
}
})