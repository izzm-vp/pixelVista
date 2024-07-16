import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FlatList } from 'react-native';
import { Cate } from '../constants/data';
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';
import Animated, { FadeInRight } from 'react-native-reanimated';

export default function Categories({ activeCate, handleChangeCat }) {


    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
            data={Cate}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <CategoryItem isActive={activeCate == item} handleChangeCate={handleChangeCat} title={item} index={index} />}
        />
    );
}

const CategoryItem = ({ title, index, isActive, handleChangeCate }) => {
    

    let textColor = isActive ? theme.colors.white : theme.colors.neutral(0.8);
    let backgroundclr=isActive ? theme.colors.neutral(0.8) : theme.colors.white ;
    
    return (
        <Animated.View entering={FadeInRight.delay(index*200).duration(1000).springify().damping(14)} style={styles.categoryItem}>

            <Pressable onPress={() => handleChangeCate(isActive ? null : title)} style={[styles.categroty,{backgroundColor:backgroundclr}]}>

                <Text style={[styles.title, {color:textColor}]}>{title}</Text>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    flatListContainer: {
        paddingHorizontal: wp(4),
        gap: 14,
    },
    categroty: {
        padding: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: theme.colors.grayBG,
        borderRadius: theme.radius.lg,
        borderCurve: "continuous",
    },
    title: {
        fontSize: hp(1.8),
        fontWeight: theme.fontWeights.medium,
    }
})
