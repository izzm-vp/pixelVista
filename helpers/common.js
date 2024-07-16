import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const wp = (percentage) => {
    const width = deviceWidth;
    return (percentage * width) / 100;
};

export const hp = (percentage) => {
    const height = deviceHeight;
    return (percentage * height) / 100;
};

export const getImageSize=(h,w)=>{
    if(w>h){
        return 250
    }else if(w<h){
        return  300
    } else {
        return 200
    }
}

export const capitalize = str => {
    return str.replace(/\b\w/g, l => l.toUpperCase());
}
