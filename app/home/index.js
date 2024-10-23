import React, { useState, useRef, useEffect, useCallback } from "react";
import { Pressable, StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../constants/theme";
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Categories from "../../components/Categrories";
import axios from "axios";
import { apiUrl } from "../../api";
import { hp, wp } from "../../helpers/common";
import ImagesGrid from "../../components/ImagesGrid";
import { debounce } from "lodash";
import Fmodal from "../../components/Fmodal";
import { useRouter } from "expo-router";

let page = 1;

export default function HomeScreen() {
    const { top } = useSafeAreaInsets();
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(null);
    const SearchInputRef = useRef(null);
    const paddingTop = top > 0 ? top + 10 : 30;
    const scrollRef = useRef(null);
    const [activeCat, setActiveCat] = useState(null);
    const [images, setImages] = useState([]);
    const modalRef = useRef(null);
    const router = useRouter()
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(apiUrl, {
                    params: {
                        page,
                        safesearch: true,
                        editors_choice: true
                    }
                });
                setImages(response.data.hits);
            } catch (error) {
                console.log("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);

    const handleChangeCat = async (cat) => {
        setActiveCat(cat);
        setImages([]);

        try {
            setSearch(null);
            let params = {
                page,
                safesearch: true,
                editors_choice: true,
            };

            if (cat) {
                params.q = cat;
            }

            if (filters) {
                params = { ...params, ...filters };
            }

            const response = await axios.get(apiUrl, { params });
            setImages(response.data.hits);
        } catch (error) {
            console.log("Error fetching images for category:", error);
        }
    };


    const handleSearch = async (text) => {
        setSearch(text);

        if (text.length > 2) {
            setActiveCat(null);
            try {
                const params = {
                    q: text,
                    page,
                    safesearch: true,
                    editors_choice: true,
                    ...filters,
                };

                const response = await axios.get(apiUrl, { params });
                setImages(response.data.hits);
            } catch (error) {
                console.log("Error searching images:", error);
            }
        } else {
            setActiveCat(null);
            try {
                const params = {
                    page,
                    safesearch: true,
                    editors_choice: true,
                    ...filters,
                };
                const response = await axios.get(apiUrl, { params });
                setImages(response.data.hits);
                SearchInputRef?.current.clear();
            } catch (error) {
                console.log("Error fetching images:", error);
            }
        }
    };


    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

    const handleOpenPress = () => modalRef.current.present();
    const closeFilterModal = () => modalRef.current.close()

    const applyFilters = async () => {
        if (filters || activeCat) {
            setImages([]);
            try {
                const params = {
                    page,
                    safesearch: true,
                    editors_choice: true,
                    ...filters,
                };

                if (activeCat) {
                    params.q = activeCat;
                }
                if (search) {
                    params.q = search;
                }

                const response = await axios.get(apiUrl, { params });
                setImages(response.data.hits);
            } catch (error) {
                console.log("Error fetching images with filters:", error);
            }
        } else {
            setActiveCat(null);
            try {
                const response = await axios.get(apiUrl, {
                    params: {
                        page,
                        safesearch: true,
                        editors_choice: true
                    }
                });
                setImages(response.data.hits);
                SearchInputRef?.current.clear();
            } catch (error) {
                console.log("Error fetching images:", error);
            }
        }
        closeFilterModal();
    };



    const resetFilters = async () => {
        setFilters(null);

        try {
            const response = await axios.get(apiUrl, {
                params: {
                    page,
                    safesearch: true,
                    editors_choice: true
                }
            });
            setImages(response.data.hits);
            if (SearchInputRef?.current) {
                SearchInputRef.current.clear();
            }
        } catch (error) {
            console.log("Error fetching images:", error);
        }

        closeFilterModal();
    };

    const clearThisFilter = async (fltr) => {
        try {
            const filterz = { ...filters };
            delete filterz[fltr];
            setFilters(filterz);
            if (Object.keys(filterz).length > 0) {
                const params = {
                    page,
                    safesearch: true,
                    editors_choice: true,
                    ...filterz
                };
                if (activeCat) {
                    params.q = { ...params.q, activeCat };
                }
                if (search) {
                    params.q = { ...params.q, search };
                }
                const response = await axios.get(apiUrl, { params });
                setImages(response.data.hits);
            } else {
                setActiveCat(null);
                const response = await axios.get(apiUrl, {
                    params: {
                        page,
                        safesearch: true,
                        editors_choice: true
                    }
                });
                setImages(response.data.hits);
                SearchInputRef?.current.clear();
            }
        } catch (error) {
            console.log("Error fetching images:", error);
        }
    };

    const HandleScroll = async (event) => {
        try {
            const contentHeight = event.nativeEvent.contentSize.height;
            const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
            const scrollOffset = event.nativeEvent.contentOffset.y;

            const bottomPosition = contentHeight - scrollViewHeight;

            if (scrollOffset >= bottomPosition - 1) {
                ++page;
                const params = {
                    page,
                    ...filters,
                    safesearch: true,
                    editors_choice: true,
                };
                if (activeCat) params.Category = activeCat;
                if (search) params.q = search;


                const response = await axios.get(apiUrl, { params });
                setImages(prevImages => prevImages.concat(response.data.hits));

            }
        } catch (error) {
            console.error("Error occurred while handling scroll:", error);
        }
    };


    const handleScrollUp = () => {
        scrollRef?.current.scrollTo({
            y: 0,
            animated: true
        });
    };

    return (
        <View style={[styles.container, { paddingTop }]}>
            <View style={styles.header}>
                <Pressable onPress={handleScrollUp}>
                    <Text style={styles.title}>Pixel Vista</Text>
                </Pressable>
                <Pressable onPress={handleOpenPress}>
                    <FontAwesome name="bars" size={30} color={theme.colors.neutral(0.5)} />
                </Pressable>
            </View>
            <ScrollView
                onScroll={HandleScroll}
                scrollEventThrottle={5}
                ref={scrollRef}
                contentContainerStyle={{ gap: 15 }}>
                <View style={styles.searchbar}>
                    <View style={styles.searchIcon}>
                        <Fontisto name="search" size={24} color={theme.colors.neutral(0.5)} />
                    </View>
                    <TextInput
                        ref={SearchInputRef}
                        onChangeText={(text) => handleTextDebounce(text)}
                        placeholder="Search for photos"
                        style={styles.searchInput}
                    />
                    {search && (
                        <Pressable onPress={() => handleSearch("")} style={styles.CloseIcon}>
                            <Ionicons name="close" size={24} color={theme.colors.neutral(0.5)} />
                        </Pressable>
                    )}
                </View>
                <View style={styles.cat}>
                    <Categories activeCate={activeCat} handleChangeCat={handleChangeCat} />
                </View>
                {filters && (
                    <View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
                            {Object.keys(filters).map((key, index) => {
                                return (
                                    <View key={key} style={styles.filterItem}>
                                        {
                                            key == "colors" ? (
                                                <View style={{
                                                    height: 25,
                                                    width: 30,
                                                    borderRadius: 7,
                                                    backgroundColor: filters[key]
                                                }} />
                                            ) : (
                                                <Text style={styles.filterItemText}>{filters[key]}</Text>
                                            )
                                        }
                                        <Pressable style={styles.filterCloseIcon} onPress={() => clearThisFilter(key)}>
                                            <Ionicons name="close" size={24} color="black" />
                                        </Pressable>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                )}
                <View>{images.length > 0 && <ImagesGrid route={router} images={images} />}</View>
                <View style={{ marginBottom: 70, marginTop: images.length > 0 ? 10 : 70 }}>
                    <ActivityIndicator size={"large"} />
                </View>
            </ScrollView>
            <Fmodal modalRef={modalRef} filterss={filters} setFilters={setFilters} onClose={closeFilterModal} onApply={applyFilters} onReset={resetFilters} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 15,
    },
    header: {
        marginHorizontal: wp(4),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: hp(4),
        fontWeight: theme.fontWeights.semibold,
        color: theme.colors.neutral,
    },
    searchbar: {
        marginHorizontal: wp(4),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.grayBG,
        backgroundColor: theme.colors.white,
        padding: 6,
        paddingLeft: 10,
        borderRadius: theme.radius.lg,
    },
    searchIcon: {
        padding: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: hp(1.8),
    },
    CloseIcon: {
        backgroundColor: theme.colors.neutral(0.3),
        padding: 8,
        borderRadius: theme.radius.sm,
    },
    filters: {
        paddingHorizontal: wp(4),
        gap: 10,
    },
    filterItem: {
        backgroundColor: theme.colors.grayBG,
        padding: 8,
        alignItems: "center",
        flexDirection: "row",
        borderRadius: theme.radius.sm,
        gap: 10,
        paddingHorizontal: 10
    },
    filterItemText: {
        fontSize: hp(1.9),
    },
    filterCloseIcon: {
        backgroundColor: theme.colors.neutral(0.2),
        padding: 4,
        borderRadius: 7,
    }
});
