import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Modal, Text, Alert, StatusBar, useColorScheme, Appearance } from "react-native";
import { Button } from "../components/Button";
import { styles } from "./styles";

function App() {
  const [modalNativeVisible, setModalNativeVisible] = useState(false);
  const [modalOverlayVisible, setModalOverlayVisible] = useState(false);
  const [modalPageSheetVisible, setModalPageSheetVisible] = useState(false);

  const theme = useColorScheme();

  function handleShowAlert(){
    Alert.alert(
      "Atenção!", 
      "Após bloquear o usuário, a conta dele perderá todo o acesso ao sistema.",
      [
        { 
          text: "Salvar",
          onPress: () => console.log("Bloqueado"),
          isPreferred: true, //ios only,
          style: "default" //ios only,
        },
        {
          text: "Cancelar",
          style: "destructive" //ios only,
        }
      ],
      {
        cancelable: true, //android only
        onDismiss: () => console.log("🚀 ~ handleShowAlert ~ onDismiss:", onDismiss), //android only
        userInterfaceStyle: "dark" //ios only
      }
    );
  }

  function handleShowPrompt() {
    //IOS only
    Alert.prompt(
      "Atenção!", 
      "Após bloquear o usuário, a conta dele perderá todo o acesso ao sistema.",
    );
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar translucent/>
      <View style={[styles.container, { gap: 16, backgroundColor: theme === "light" ? "#FFF" : "#000" }]}>
        <Button onPress={() => setModalNativeVisible(true)}>
          Abrir modal nativo
        </Button>
        <Button onPress={() => setModalOverlayVisible(true)}>
          Abrir modal overlay
        </Button>
        <Button onPress={() => setModalPageSheetVisible(true)}>
          Abrir modal page sheet
        </Button>
        <Button onPress={() => handleShowAlert()}>
          Abrir alert
        </Button>
        <Button onPress={() => handleShowPrompt()}>
          Abrir alert prompt
        </Button>
        <Button onPress={() => Appearance.setColorScheme(theme === "dark" ? "light" : "dark")}>
          Abrir toggle theme
        </Button>
      </View>

      <Modal
        visible={modalPageSheetVisible}
        animationType="slide"
        statusBarTranslucent //android only
        //IOS only
        presentationStyle="pageSheet"
        onRequestClose={() => setModalPageSheetVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={{ marginBottom: 20, color: "#FFF" }}>Conteúdo do modal page sheet</Text>
          <Button
            style={{ paddingHorizontal: 20 }}
            onPress={() => setModalPageSheetVisible(false)}
          >
            Fechar
          </Button>
        </View>
      </Modal>

      <Modal
        visible={modalOverlayVisible}
        animationType="fade"
        statusBarTranslucent //android only
        transparent
      >
        <View style={styles.modalContainerOverlay}>
          <View
            style={{ backgroundColor: "#FFF", padding: 16, borderRadius: 8 }}
          >
            <Text style={{ marginBottom: 20 }}>Conteúdo do modal overlay</Text>
            <Button
              style={{ paddingHorizontal: 20 }}
              onPress={() => setModalOverlayVisible(false)}
            >
              Fechar
            </Button>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalNativeVisible}
        animationType="slide"
        statusBarTranslucent //android only
        transparent
      >
        <View style={styles.modalContainer}>
          <Text style={{ marginBottom: 20, color: "#FFF" }}>
            Conteúdo do modal overlay
          </Text>
          <Button
            style={{ paddingHorizontal: 20 }}
            onPress={() => setModalNativeVisible(false)}
          >
            Fechar
          </Button>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default App;
