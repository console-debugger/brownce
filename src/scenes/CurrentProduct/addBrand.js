
import { MyText, Touchable } from "../../components/customComponent"
import { BLACK, GRAY, LIGHT_WHITE, THEME, WHITE } from "../../utils/colors"
import React, { useState } from 'react';
import { View, Platform, StyleSheet, ScrollView, TextInput } from 'react-native';
import { montserratBold } from "../../utils/fontFamily";
import { SCREEN_WIDTH, showToast } from "../../components/helper";
import { dynamicSize } from "../../utils/responsive";
import { useDispatch } from "react-redux";
import { addBrandNameAction } from "../../redux/action";

// @ Add brands UI design
const AddBrand = () => {
    const dispatch = useDispatch()
    const [brand, setBrand] = useState('')

    // @ Create brand
    const submit = () => {
        if (brand) {
            const param = {
                "Description": '',
                "BrandName": brand
            }
            dispatch(addBrandNameAction(param))
        }
        else showToast('Please enter brand name')
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container1}>
                <View style={styles.viewHolder}>
                    <TextInput style={styles.text}
                        placeholder={"Enter brand name"}
                        placeholderTextColor={BLACK}
                        valus={brand}
                        onChangeText={value => setBrand(value)}>
                    </TextInput>
                </View>
                <Touchable onPress={submit} style={styles.AddHolder}>
                    <MyText style={{ color: WHITE, fontFamily: montserratBold, fontSize: 15 }}>{"Submit"}</MyText>
                </Touchable>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: LIGHT_WHITE,
            justifyContent: 'center',
            paddingTop: (Platform.OS == 'ios') ? 20 : 0
        },
        container1: {
            flex: 1,
            backgroundColor: LIGHT_WHITE,
            paddingTop: (Platform.OS == 'ios') ? 20 : 20
        },
        viewHolder: {
            height: 55,
            backgroundColor: WHITE,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            alignSelf: 'center',
            borderColor: GRAY,
            borderWidth: 1,
            margin: 4,
            width: '70%'
        },
        AddHolder: {
            height: 55,
            backgroundColor: THEME,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            alignSelf: 'center',
            margin: 4,
            width: '72%'
        },
        text: {
            color: BLACK,
            fontSize: 10.5,
            alignSelf: 'center',
            textAlign: 'center',
            fontFamily: montserratBold,
            width: '45%'
        },
        btn: {
            position: 'absolute',
            right: 25,
            bottom: 25,
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15
        },
        btnImage: {
            resizeMode: 'contain',
            width: 70,
            height: 70
        },
        buttonStyle: {
            width: SCREEN_WIDTH - dynamicSize(70)
        }
    });

export default AddBrand







