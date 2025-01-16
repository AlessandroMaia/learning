import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    overflow: "scroll",
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  contentContainer: {
    gap: 16,
  },
  button: {
    backgroundColor: "#000",
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLabel: {
    color: "#fff",
    fontWeight: "bold",
  },
  androidButtonContianer: {
    overflow: "hidden",
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  postContainer: {
    backgroundColor: "#333",
    padding: 24,
    borderRadius: 8,
  },
  postTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "#000",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainerOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});
