import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  SectionList,
} from "react-native";
import { styles } from "./styles";

const posts = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  title: `Post #${index + 1}`,
}));

function Header() {
  return (
    <View
      style={{
        backgroundColor: "#ccc",
        padding: 16,
        borderRadius: 8,
      }}
    >
      <Text>Cabeçalho</Text>
    </View>
  );
}

function Footer() {
  return (
    <View
      style={{
        backgroundColor: "#000",
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
      }}
    ></View>
  );
}

function EmptyState() {
  return (
    <View
      style={{
        backgroundColor: "#555",
        padding: 16,
        borderRadius: 8,
      }}
    >
      <Text>Nenhum item foi encontrado!</Text>
    </View>
  );
}

function App() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function handleRefresh() {
    setIsRefreshing(true);

    await new Promise((res) => setTimeout(res, 5000));

    setIsRefreshing(false);
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      {/* <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      > 
       {posts.map((post, index) => (
          <View key={index} style={styles.postContainer}>
            <Text style={styles.postTitle}>{post.title}</Text>
          </View>
        ))} 
       </ScrollView> */}

      {/* <ActivityIndicator
        animating={false}
        hidesWhenStopped //ios only
      /> */}

      {/* <FlatList
        // numColumns={3}
        // columnWrapperStyle={{ gap: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            //ios only
            tintColor="#F00"
            title="Carregando...."
            titleColor="#F00"
            //android only
            colors={["#F00", "#0F0", "#00F"]}
            progressBackgroundColor="#000"
            size="large"
          />
        }
        ListHeaderComponent={Header}
        ListFooterComponent={Footer}
        ListEmptyComponent={EmptyState}
        // ItemSeparatorComponent={<View style={{
        //   height: 1,
        //   backgroundColor: '#aaa',
        //   marginVertical: 16
        // }}/>}
        stickyHeaderIndices={[0]}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={posts}
        keyExtractor={(post) => post.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postTitle}>{item.title}</Text>
          </View>
        )}
        getItemLayout={(data, index) => ({
          index,
          length: 64 + 16,
          offset: (64 + 16) * index,
        })}
      /> */}

      <SectionList
        ListHeaderComponent={Header}
        ListFooterComponent={Footer}
        ListEmptyComponent={EmptyState}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        sections={[
          {
            key: 1,
            data: posts.slice(0, 5),
          },
          {
            key: 2,
            renderItem: ({ item }) => (
              <View style={styles.postContainer}>
                <Text style={[styles.postTitle, {color: "#f00"}]}>{item.title}</Text>
              </View>
            ),
            data: posts.slice(5, 10)
          }
        ]}
        keyExtractor={(post) => post.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postTitle}>{item.title}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { key } }) => (
          <View>
            <Text>Section - #{key}</Text>
          </View>
        )}
        
      />
    </SafeAreaView>
  );
}

export default App;
