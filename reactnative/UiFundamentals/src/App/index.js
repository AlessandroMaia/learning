import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";

import { styles } from "./styles";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    async function load() {
      // const res = await fetch('http://jsonplaceholder.typicode.com/todos/1');
      // const res = await fetch('http://localhost:3000/todos/1');
      const res = await fetch('http://192.168.0.44:3000/todos/1');
      // const res = await fetch('http://10.0.2.2:3000/todos/1');

      const todoObj = await res.json();

      await new Promise(resolve => {
        setTimeout(resolve, 1000);
      });

      setTodo(todoObj);
      setIsLoading(false);
    }

    load();
  }, [])

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        {isLoading && (
          <ActivityIndicator />
        )}

        {todo && (
          <Text style={{ fontSize: 32 }}>{todo.title}</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

export default App;
