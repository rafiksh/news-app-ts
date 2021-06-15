import React from "react";
import { View, TouchableOpacity, Dimensions, Image } from "react-native";
import { Card as DefaultCard, CardItem, Button, Left, Body } from "native-base";

import { styles } from "./card.styles";
import { Text, Title, NoteText } from "../typography/typography.styled";
import { useScreenDimensions } from "../../../hooks/useScreenDimensions";

interface CardProps {
  title: any;
  imageURL: any;
  date: any;
  text: string;
  source: string;
  author: string;
}

interface ActionRowProps {
  LeftIcon?: any;

  title: any;

  date: any;

  RightIcon?: any;

  handlePress?: any;

  isEnabled?: any;
}

export const Card = ({
  imageURL,
  date,
  title,
  text,
  source,
  author,
}: CardProps) => {
  const { isLandscape } = useScreenDimensions();
  const imageWidth = Dimensions.get("screen").width * (isLandscape ? 0.3 : 0.8);

  return (
    <DefaultCard style={{ flex: 0 }}>
      <CardItem>
        <Body>
          <Title>{title}</Title>
          <NoteText>{`${date} by: ${author}`}</NoteText>
        </Body>
      </CardItem>
      <CardItem>
        <Body style={styles.view}>
          <Image
            source={{ uri: imageURL }}
            style={{ height: 200, width: imageWidth, flex: 1 }}
          />
          <Text>{text}</Text>
        </Body>
      </CardItem>
      <CardItem>
        <Left>
          <Button transparent textStyle={{ color: "red" }}>
            <Text style={styles.link}>{source}</Text>
          </Button>
        </Left>
      </CardItem>
    </DefaultCard>
  );
};
export const ActionRow = (props: ActionRowProps) => {
  const { title, handlePress, isEnabled, date } = props;
  return (
    <TouchableOpacity
      onPress={isEnabled === undefined || isEnabled ? handlePress : null}
      style={styles.rowContainer}
    >
      <View>
        <Text>{title}</Text>
        <NoteText>{date}</NoteText>
      </View>
    </TouchableOpacity>
  );
};
