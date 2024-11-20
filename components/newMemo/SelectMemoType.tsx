import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Edit from "@/assets/images/icons/edit-04.svg";
import colors from "@/constants/colors";
import { useMemoStore } from "@/stores/memo";

export const SelectMemoType = () => {
  const { type, setType } = useMemoStore();

  return (
    <View style={styles.actionsContainer}>
      <View style={styles.actionGroup}>
        <TouchableOpacity style={styles.circle} onPress={() => setType("mood")}>
          <Text style={{ fontSize: 40.2 }}>🙂</Text>
        </TouchableOpacity>
        <View style={styles.textCapsule}>
          <Text style={styles.text}>기분</Text>
        </View>
      </View>
      <View style={styles.actionGroup}>
        <TouchableOpacity style={styles.circle} onPress={() => setType("message")}>
          <Edit />
        </TouchableOpacity>
        <View style={styles.textCapsule}>
          <Text style={styles.text}>메모</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 19,
  },
  actionGroup: {
    alignItems: "center",
    gap: 10,
  },
  circle: {
    width: 68,
    height: 68,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: colors.white,
  },
  textCapsule: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  text: { fontSize: 16, color: "#000", fontWeight: "500" },
});
