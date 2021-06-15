import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: "blue",
  },
  rowContainer: {
    flex: 1,
    alignItems: "center",
    height: 125,
    marginVertical: 10,
    paddingVertical: 10,
    backgroundColor: "white",
    justifyContent: "space-between",
    borderRadius: 16,
  },
  infoContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftIcon: {
    paddingRight: 12,
  },
  title: {
    fontSize: 17,
  },
  titleDisabled: {
    fontSize: 17,
    color: "#6E7980",
  },
});
