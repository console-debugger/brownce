import React from "react"
import Header from "../../components/header";
import { WHITE } from "../../utils/colors";
import { ScrollView } from "react-native";
import HTML from "react-native-render-html";

import { BASE_URL } from "../../services/serviceConfig";

// Webview or html render UI
const webView = (props) => {

  return (
    <ScrollView style={{ flex: 1 }}>
      <Header isTheme isBack navigation={props.navigation} title={props.route.params.title} />
      <HTML source={{ uri: `${BASE_URL}/Admin/Home/CmsContent/${props.route.params.id}` }} />
    </ScrollView>
  )
}

export default webView