import React from "react";
import { Picker } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import { Platform } from "react-native";

interface PickerProps {
  placeholder: string;
  value: any;
  setValue: any;
  options: { label: string; value: string }[];
}
export const StyledPicker = ({
  placeholder,
  value,
  setValue,
  options,
}: PickerProps) => (
  <Picker
    mode="dropdown"
    iosIcon={<Ionicons name="arrow-down-outline" />}
    placeholder={placeholder}
    style={{ height: Platform.OS === "ios" ? undefined : 45 }}
    selectedValue={value}
    onValueChange={(itemValue) => setValue(itemValue)}
  >
    {options.map(({ label, value }) => (
      <Picker.Item key={value} label={label} value={value} />
    ))}
  </Picker>
);
