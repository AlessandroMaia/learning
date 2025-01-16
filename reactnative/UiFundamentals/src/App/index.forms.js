import React, { useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  TextInput,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { styles } from "./styles";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { TextArea } from "../components/TextArea";

function App() {
  const passwordInputRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState(false);

  function handleSumbit() {
    console.log({ email, password, selected });
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Switch
          style={{ marginRight: "auto" }}
          value={selected}
          //onChange={(value) => setSelected(event.nativeEvent.value)}
          onValueChange={setSelected}
          thumbColor="#999"
          trackColor={{ false: "#f00", true: "#0f0" }}
          ios_backgroundColor="#f00"
        />
        <TextArea placeholder="Descrição" />
        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          onSubmitEditing={() => passwordInputRef.current.focus()}
          submitBehavior="submit"
          returnKeyType="next"
          enablesReturnKeyAutomatically //IOS only
          value={email}
          // onChange={(event) => {
          //   setEmail(event.nativeEvent.text);
          // }}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          ref={passwordInputRef}
          placeholder="Senha"
          secureTextEntry
          keyboardType="ascii-capable"
          returnKeyType="done"
          onSubmitEditing={handleSumbit}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button onPress={handleSumbit}>Oi botão!</Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default App;
