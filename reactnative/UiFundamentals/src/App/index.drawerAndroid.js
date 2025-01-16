import React, { useRef } from "react";
import { SafeAreaView, View } from "react-native";

import { Button } from "../components/Button";
import { styles } from "./styles";

function App() {
  const drawerRef = useRef();

  function handleOpenMenu() {
    drawerRef.current?.openDrawer();
  }

  return (
    //android only
    <DrawerLayoutAndroid
      renderNavigationView={() => (
        <View>
          <Text>Oi menu</Text>
        </View>
      )}
      ref={drawerRef}
      //drawerPosition="right"
      //drawerWidth={100}
      //drawerLockMode="locked-closed"
    >
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <Button onPress={handleOpenMenu}>Abrir menu</Button>
        </View>
      </SafeAreaView>
    </DrawerLayoutAndroid>
  );
}

export default App;
