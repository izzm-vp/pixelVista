import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useMemo } from "react";
import { BlurView } from 'expo-blur'
import Animated, {  Extrapolation, FadeInDown, interpolate, useAnimatedStyle } from "react-native-reanimated";
import { hp ,capitalize} from "../helpers/common";
import { theme } from "../constants/theme";
import SectionView ,{ColorFilter, CommonFilView} from "./FilterView";
import { filters } from "../constants/data";

export default function Fmodal({
   modalRef,
   onClose,
   onApply,
   onReset,
   filterss,
   setFilters,





}) {
  const snapPoints = useMemo(() => ['80%'], [])

  return (
    <View style={styles.container}>
      <BottomSheetModal
        index={0}
        ref={modalRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={CustomBackdrop}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.content}>
            <Text style={styles.ftext}>Filters</Text>
              {
                Object.keys(sections).map((sectionName,index)=>{
                  let SecView=sections[sectionName];
                  let sectionData=filters[sectionName]
                  let title=capitalize(sectionName);
                  return (
                    <Animated.View entering={FadeInDown.delay((index*100+100)).springify().damping(11)} key={sectionName}>
                      <SectionView
                        title={title}
                        content={SecView({data:sectionData,
                        filterss,
                        setFilters,
                        filterName:sectionName
                        
                        })}/>
                    </Animated.View>
                  )
                })
              }
             <Animated.View entering={FadeInDown.delay(500).springify().damping(11)} style={styles.buttons}>

              <Pressable style={styles.resetB} onPress={onReset}>
                <Text style={[styles.buttonT,{color:theme.colors.neutral(0.9)}]}>Reset</Text>
              </Pressable>

              <Pressable style={styles.applyB} onPress={onApply}>
                <Text style={[styles.buttonT,{color:theme.colors.white}]}>Apply</Text>
              </Pressable>

             </Animated.View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  )
}

const sections={
  "order":(props)=> <CommonFilView {...props}/>,
  "orientation":(props)=> <CommonFilView {...props}/>,
  "type":(props)=> <CommonFilView {...props}/>,
  "colors":(props)=> <ColorFilter {...props}/>
}





const CustomBackdrop = ({ animatedIndex, style }) => {

  const containerAnimate = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );

    return {
      opacity,
    };
  });

  const containerStyle = [
    styles.overlay,
    StyleSheet.absoluteFill,
    style,
    containerAnimate,
  ];

  return (
    <Animated.View style={containerStyle}>
      <BlurView intensity={25}  tint="dark" style={StyleSheet.absoluteFillObject} />
    </Animated.View>
  );
};



const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  content:{
    flex:1,
      gap:15,
      paddingHorizontal:20,

  },
  buttons:{
    flex:1,
     flexDirection:"row",
     alignItems:"center",
     gap:10


  },
  applyB:{
    flex:1,
    backgroundColor:theme.colors.neutral(0.8),
    padding:12,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:theme.radius.lg


  },
  
  resetB:{
    flex:1,
    backgroundColor:theme.colors.neutral(0.03),
    padding:12,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:theme.radius.lg,
    borderWidth:2,
    borderColor:theme.colors.grayBG,


  },
  ftext:{
    fontSize:hp(4),
    fontWeight:theme.fontWeights.semibold,
    color:theme.colors.neutral(0.8),
    marginBottom:5


  },
  buttonT:{
    fontSize:hp(2.2)
  }

});