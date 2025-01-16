import React from "react";
import { SafeAreaView, Text, View } from "react-native";

import { styles } from "./styles";

function App() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={{ fontSize: 32, fontFamily: 'Jersey15-Regular' }}>Hello ReactNative!</Text>
      </View>
    </SafeAreaView>
  );
}

export default App;
