import React from "react";
import { Text as DefaultText, TextProps } from "react-native";

import { styles } from "./typography.styles";

interface Props extends TextProps {
  children: string | number;
}

export const Title = ({ style, children, ...props }: Props) => {
  return (
    <DefaultText style={[styles.title, style]} {...props}>
      {children}
    </DefaultText>
  );
};
export const Text = ({ style, children, ...props }: Props) => {
  return (
    <DefaultText style={[styles.paragraph, style]} {...props}>
      {children}
    </DefaultText>
  );
};
export const NoteText = ({ style, children, ...props }: Props) => {
  return (
    <DefaultText style={[styles.note, style]} {...props}>
      {children}
    </DefaultText>
  );
};
