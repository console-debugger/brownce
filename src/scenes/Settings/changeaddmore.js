import React, { useState } from 'react';
import { View, Platform, StyleSheet, ScrollView, TextInput } from 'react-native';
import { MyText, Touchable } from "../../components/customComponent"
import { BLACK, GRAY, LIGHT_WHITE, THEME, WHITE } from "../../utils/colors"
import { montserratBold } from "../../utils/fontFamily";
import { SCREEN_WIDTH, showToast } from "../../components/helper";
import { dynamicSize } from "../../utils/responsive";
import { useDispatch } from "react-redux";
import { addCustomServiceAction } from "../../redux/action";

// Add or remove services
const ChangeAddCustomService = () => {

    const dispatch = useDispatch()
    const [value, setvalue] = useState('')

    const submit = () => {
        if (value) {
            const param = {
                "ServiceMasterId": 0,
                "ServiceName": value
            }
            dispatch(addCustomServiceAction(param, false))
        }
        else {
            showToast('Please enter service name')
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container1}>
                <View style={styles.viewHolder}>
                    <TextInput style={styles.text}
                        placeholder={"Enter service name"}
                        placeholderTextColor={BLACK}
                        onChangeText={(value) => setvalue(value)}>
                    </TextInput>
                </View>
                <Touchable onPress={submit} style={styles.AddHolder}>
                    <MyText style={{ color: WHITE, fontFamily: montserratBold, fontSize: 15 }}>
                        {"Submit"}
                    </MyText>
                </Touchable>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create(
    {
        container:
        {
            flex: 1,
            backgroundColor: LIGHT_WHITE,
            justifyContent: 'center',
            paddingTop: (Platform.OS == 'ios') ? 20 : 0
        },

        container1:
        {
            flex: 1,
            backgroundColor: LIGHT_WHITE,
            //justifyContent: 'center',
            paddingTop: (Platform.OS == 'ios') ? 20 : 0
        },

        viewHolder:
        {
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

        AddHolder:
        {
            height: 55,
            backgroundColor: THEME,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            alignSelf: 'center',
            margin: 4,
            width: '72%'
        },

        text:
        {  //padding:20,
            color: BLACK,
            fontSize: 10.5,
            alignSelf: 'center',
            textAlign: 'center',
            fontFamily: montserratBold,
            width: '45%'
        },

        btn:
        {
            position: 'absolute',
            right: 25,
            bottom: 25,
            //borderRadius: 30,
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            //backgroundColor: 'rgba(0,0,0,0.7)',
            padding: 15
        },

        btnImage:
        {
            resizeMode: 'contain',
            width: 70,
            height: 70
        },
        buttonStyle: {
            width: SCREEN_WIDTH - dynamicSize(70)
        },
    });

export default ChangeAddCustomService







