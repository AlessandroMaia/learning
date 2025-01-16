import React from "react";
import {
  ScrollView,
  Button,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Pressable,
} from "react-native";
import { styles } from "./style";

function App() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={styles.container} scrollEnabled={false}>
        <View style={styles.buttonsContainer}>
          <Button
            title="Button"
            color="#000"
            onPress={(event) => alert("Botão pressionado")}
            disabled
            //touchSoundDisabled={false} //android only
          />

          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.button, styles.buttonDisabled]}
            disabled={true}
            //
            onPress={(event) => console.log("TouchableOpacity: onPress")}
            onPressIn={(event) => console.log("TouchableOpacity: onPressIn")}
            onPressOut={(event) => console.log("TouchableOpacity: onPressOut")}
            onLongPress={(event) =>
              console.log("TouchableOpacity: onLongPress")
            }
            delayLongPress={3000}
          >
            <Text style={styles.buttonLabel}>TouchableOpacity</Text>
          </TouchableOpacity>

          <TouchableHighlight
            onPress={(event) => console.log("TouchableHighlight: onPress")}
            onPressIn={(event) => console.log("TouchableHighlight: onPressIn")}
            onPressOut={(event) =>
              console.log("TouchableHighlight: onPressOut")
            }
            onLongPress={(event) =>
              console.log("TouchableHighlight: onLongPress")
            }
            delayLongPress={3000}
            style={styles.button}
            underlayColor="#f00"
            activeOpacity={0.3}
          >
            <Text style={styles.buttonLabel}>TouchableHighlight</Text>
          </TouchableHighlight>

          <TouchableWithoutFeedback
            onPress={(event) =>
              console.log("TouchableWithoutFeedback: onPress")
            }
            onPressIn={(event) =>
              console.log("TouchableWithoutFeedback: onPressIn")
            }
            onPressOut={(event) =>
              console.log("TouchableWithoutFeedback: onPressOut")
            }
            onLongPress={(event) =>
              console.log("TouchableWithoutFeedback: onLongPress")
            }
            delayLongPress={3000}
          >
            <View style={styles.button}>
              <Text style={styles.buttonLabel}>TouchableWithoutFeedback</Text>
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.androidButtonContianer}>
            <TouchableNativeFeedback
              onPress={(event) =>
                console.log("TouchableNativeFeedback: onPress")
              }
              onPressIn={(event) =>
                console.log("TouchableNativeFeedback: onPressIn")
              }
              onPressOut={(event) =>
                console.log("TouchableNativeFeedback: onPressOut")
              }
              onLongPress={(event) =>
                console.log("TouchableNativeFeedback: onLongPress")
              }
              delayLongPress={3000}
              background={TouchableNativeFeedback.Ripple("#f00")}
            >
              <View style={styles.button}>
                <Text style={styles.buttonLabel}>TouchableNativeFeedback</Text>
              </View>
            </TouchableNativeFeedback>
          </View>

          <TouchableOpacity
            onPress={() => alert("ver mais.")}
            style={{
              backgroundColor: "#f00",
              alignSelf: "flex-start",
            }}
            hitSlop={{
              left: 10,
              bottom: 10,
              right: 10,
              top: 10,
            }}
            pressRetentionOffset={16}
          >
            <Text>Ver mais</Text>
          </TouchableOpacity>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && {
                opacity: 0.8,
                transform: "scaleX(0.9)",
              },
            ]}
            android_ripple={{ color: "#f00" }}
            android_disableSound={false}
            onPress={(event) => console.log("Pressable: onPress")}
            onPressIn={(event) => console.log("Pressable: onPressIn")}
            onPressOut={(event) => console.log("Pressable: onPressOut")}
            onLongPress={(event) => console.log("Pressable: onLongPress")}
          >
            {({ pressed }) => (
              <Text style={[styles.buttonLabel, pressed && { opacity: 0.5 }]}>
                Pressable
              </Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
