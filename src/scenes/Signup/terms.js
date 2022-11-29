import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux";
import { loaderAction, getCmsAction } from "../../redux/action";
import { ScrollView } from "react-native";
import HTML from "react-native-render-html";
import { useFocusEffect } from "@react-navigation/native";

// Terms and condition web view
const Terms = () => {

  const dispatch = useDispatch()
  const state = useSelector(state => { return state })
  const { cmsContent } = state['profileReducer']

  useFocusEffect(
    useCallback(() => {
      dispatch(loaderAction(true))
      dispatch(getCmsAction(1))
    }, []))

  return (
    <ScrollView style={{ flex: 1 }}>
      <HTML source={{ html: cmsContent['HTMLContent'] }} containerStyle={{ marginLeft: 6 }} />
    </ScrollView>
  )
}

export default Terms