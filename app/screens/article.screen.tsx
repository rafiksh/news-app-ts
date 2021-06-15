import React from "react";
import { Dimensions, Image, ScrollView } from "react-native";
import { View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { useScreenDimensions } from "../hooks/useScreenDimensions";

import { Card } from "../components/styled/card/card.styled";
import {
  Text,
  Title,
  NoteText,
} from "../components/styled/typography/typography.styled";

import { newsActions } from "../store/slice/news/news.slice";
import { Article } from "../store/slice/news/index";
import { RootState } from "../store/store";

type ReduxProps = ConnectedProps<typeof connector>;

const ArticleScreen = (props: ReduxProps) => {
  const { getNews, selectedArticle } = props;
  const { isLandscape } = useScreenDimensions();
  const imageWidth = Dimensions.get("screen").width * (isLandscape ? 0.3 : 0.8);

  return (
    <ScrollView style={styles.container}>
      <Title>{selectedArticle.title}</Title>
      <NoteText>{"By " + selectedArticle.author}</NoteText>
      <NoteText>{selectedArticle.publishedAt}</NoteText>
      <Text>{selectedArticle.source.name}</Text>
      <View style={styles.contentContainer}>
        <View style={styles.separator} />
        <Image
          source={{ uri: selectedArticle.urlToImage }}
          style={{ height: 200, width: imageWidth, flex: 1 }}
        />
        <Text>{selectedArticle.content}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: "grey",
  },
});

const mapState = (state: RootState) => ({
  counter: state.news.counter,
  selectedArticle: state.news.selectedArticle,
});

const mapDispatch = {
  getNews: newsActions.getNews,
  increment: newsActions.increment,
};

const connector = connect(mapState, mapDispatch);
const ArticleScreenRedux = connector(ArticleScreen);

export { ArticleScreenRedux as ArticleScreen };
