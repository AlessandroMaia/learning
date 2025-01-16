import React from "react";
import {
  Image,
  PixelRatio,
  SafeAreaView,
  Text,
  useWindowDimensions,
  View
} from "react-native";

import { UserIcon } from "../components/UserIcon";
import { styles } from "./styles";

function App() {
  const dimensions = useWindowDimensions();
  const orientation =
    dimensions.width > dimensions.height ? "landscape" : "portrait";

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text>Font scale: {dimensions.fontScale}</Text>
        <Text>Pixel ratio: {dimensions.scale}</Text>
        <Text>Dimentions: {Math.round(dimensions.width)} x {Math.round(dimensions.height)}</Text>
        <Text>Orientation: {orientation}</Text>

        <Text>{PixelRatio.get()}</Text>
        <Text>{PixelRatio.getPixelSizeForLayoutSize(1)}</Text>
        <Text>{PixelRatio.roundToNearestPixel(4.98)}</Text>

        <Image
          source={require("../images/user-icon/user-icon.png")}
          alt="GTR na estrada"
          style={{ width: 100, height: 100 }}
        />

        <Image
          source={[
            {
              uri: "https://placehold.co/100x100.png",
              width: 100,
              height: 100
            },
            {
              uri: "https://placehold.co/200x200.png",
              width: 200,
              height: 200
            },
            {
              uri: "https://placehold.co/300x300.png",
              width: 300,
              height: 300
            }
          ]}
          style={{ width: 100, height: 100 }}
        />

        <UserIcon />
      </View>
    </SafeAreaView>

    // <ImageBackground
    //   source={require("../images/gtr.jpg")}
    //   alt="GTR na estrada"
    //   style={{ flex: 1 }}
    // >
    //   <SafeAreaView style={styles.wrapper}>
    //     <View style={styles.container}>
    //       <Image
    //         source={{
    //           uri: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //           method: "GET",
    //           body: JSON.stringify({ name: "GTR" }),
    //           headers: {
    //             "Content-type": "application/json",
    //           },
    //         }}
    //         alt="GTR na estrada"
    //         style={{ width: 300, height: 150 }}
    //         resizeMode="stretch"
    //         //tintColor="#F00"
    //         //blurRadius={50}
    //         defaultSource={require("../images/gtr.jpg")}
    //         onLoadStart={() => console.log("onLoadStart")}
    //         onLoadEnd={() => console.log("onLoadEnd")}
    //         onLoad={() => console.log("onLoad")}
    //         onProgress={(event) => {
    //           const { loaded, total } = event.nativeEvent;
    //           const percentage = Math.round((loaded / total) * 100);
    //           console.log(`🚀 Carregou ${percentage}%`);
    //         }}
    //       />
    //     </View>
    //   </SafeAreaView>
    // </ImageBackground>
  );
}

export default App;
