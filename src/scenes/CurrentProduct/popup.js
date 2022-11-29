import React from "react"
import { ImageBackground } from "react-native"
import { MyText, MyView } from "../../components/customComponent"
import { popupIcon } from "../../components/icons"
import styles from "./styles"

const Popup = props => {
    return (
        <ImageBackground
            resizeMode={'contain'}
            source={popupIcon}
            style={styles['image']}>
            <MyView style={{ marginTop: 15 }}>
                <MyText onPress={props.editPress} style={styles['text']}>
                    {"Edit Product"}
                </MyText>
                <MyText onPress={props.onPress} style={[styles['text'], { marginTop: 9 }]}>
                    {"Delete Product"}
                </MyText>
            </MyView>
        </ImageBackground>
    )
}

export default Popup