import { StyleSheet, View, Text, Pressable } from "react-native";
import { capitalize, hp } from "../helpers/common";
import { theme } from "../constants/theme";

export default function SectionView({ title, content }) {
    return (
        <View style={{ marginBottom: 8 }}>
            <Text style={styles.sectiontit}>
                {title}
            </Text>
            <View>
                {content}
            </View>
        </View>
    );
}

export const CommonFilView = ({ data, filterName, filterss, setFilters }) => {
    const onSelect = (item, filterName) => {
        setFilters({ ...filterss, [filterName]: item });
    };

    return (
        <View style={styles.styleRowWrap}>
            {data && data.map((item, index) => {
                let isActive = filterss && filterss[filterName] === item;
                let backgroundColor = isActive ? theme.colors.neutral(0.7) : "white";
                let color = isActive ? "white" : theme.colors.neutral(0.7);
                return (
                    <Pressable
                        onPress={() => onSelect(item, filterName)}
                        key={item}
                        style={[styles.outLineB, { backgroundColor }]}
                    >
                        <Text style={[styles.outLineBT, { color }]}>
                            {capitalize(item)}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
};
export const ColorFilter = ({ data, filterName, filterss, setFilters }) => {
    const onSelect = (item, filterName) => {
        setFilters({ ...filterss, [filterName]: item });
    };

    return (
        <View style={styles.styleRowWrap}>
            {data && data.map((item, index) => {
                let isActive = filterss && filterss[filterName] === item;
                let borderColor=isActive ? theme.colors.neutral(0.4) : "white";
                return (
                    <Pressable
                        onPress={() => onSelect(item, filterName)}
                        key={item}
                    >
                        <View style={[styles.colorWrapper,{borderColor}]}>
                            <View style={[styles.color,,{backgroundColor:item}]} />
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    sectiontit: {

        fontSize: hp(2.4),
        paddingBottom: 10,
        fontWeight: theme.fontWeights.medium,
        color: theme.colors.neutral(0.8)
    },
    styleRowWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    outLineB: {
        padding: 8,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: theme.colors.grayBG,
        borderRadius: theme.radius.sm
    },
    outLineBT: {
    },
    color:{
        height:30,
        width:40,
        borderRadius:theme.radius.sm-3,
        borderCurve:"continuous",
    },
    colorWrapper: {
        padding: 3,
        borderRadius: theme.radius.sm-3,
        borderWidth:2,
        borderCurve:"continuous",

    }
});
