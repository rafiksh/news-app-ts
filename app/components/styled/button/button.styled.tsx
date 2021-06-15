import React from "react";
import { Text as DefaultText, TextProps } from "react-native";

import { styles } from "./button.styles";

interface Props extends TextProps {
  children: string | number;
}
