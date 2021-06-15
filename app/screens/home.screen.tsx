import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RefreshControl, ScrollView, TouchableOpacity } from "react-native";
import { View, StyleSheet, FlatList } from "react-native";
import { Picker } from "native-base";
import { usePromiseTracker } from "react-promise-tracker";
import { Ionicons } from "@expo/vector-icons";

import { RootState } from "../store/store";
import { Card } from "../components/styled/card/card.styled";
import { StyledPicker } from "../components/styled/picker/picker.styled";
import { newsActions } from "../store/slice/news/news.slice";
import { Article } from "../store/slice/news/index";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Platform } from "react-native";

type ReduxProps = ConnectedProps<typeof connector>;
const HomeScreen = (props: ReduxProps) => {
  const { navigate } = useNavigation();
  const { promiseInProgress } = usePromiseTracker();
  const {
    articles,
    options,
    filterSource,
    getNews,
    setCategory,
    setCountry,
    setSource,
    setSelectedArticle,
    addHistory,
  } = props;

  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [sources, setSources] = useState<{ label: string; value: string }[]>([
    { label: "All", value: "all" },
  ]);

  useEffect(() => {
    getNews({ country: options.country, category: options.category });
    setSources([
      { label: "All", value: "all" },
      ...[...new Set(articles.map((item) => item.source.name))].map((el) => ({
        label: el,
        value: el,
      })),
    ]);
  }, [getNews, options.category, options.country]);

  useEffect(() => {
    const temp =
      filterSource === "all"
        ? articles
        : articles.filter(
            ({ source }: Article) => source.name === filterSource
          );
    setFilteredArticles(temp);
  }, [
    filterSource,
    articles,
    setFilteredArticles,
    options.category,
    options.country,
  ]);

  const renderCard = ({ item }: { item: Article }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedArticle(item.url);
        addHistory({ url: item.url, title: item.title });
        navigate("ArticleScreen");
      }}
    >
      <Card
        date={item.publishedAt}
        imageURL={item.urlToImage}
        text={item.content}
        title={item.title}
        source={item.source.name}
        author={item.author}
      />
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={promiseInProgress}
          onRefresh={() =>
            getNews({
              country: options.country,
              category: options.category,
            })
          }
        />
      }
    >
      <View style={styles.container}>
        <StyledPicker
          placeholder="Select Source"
          value={filterSource}
          setValue={setSource}
          options={sources}
        />
      </View>
      <View style={styles.pickerContainer}>
        <View style={styles.picker}>
          <StyledPicker
            placeholder="Select Country"
            value={options.country}
            setValue={setCountry}
            options={[
              { label: "Egypt", value: "eg" },
              { label: "UAE", value: "ae" },
            ]}
          />
        </View>
        <View style={styles.picker}>
          <StyledPicker
            placeholder="Select Category"
            value={options.category}
            setValue={setCategory}
            options={[
              { label: "Sports", value: "sports" },
              { label: "Business", value: "business" },
            ]}
          />
        </View>
      </View>
      <FlatList
        data={filteredArticles}
        renderItem={renderCard}
        keyExtractor={(item) => item.title}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  picker: {
    flex: 0.5,
  },
});

const mapState = (state: RootState) => ({
  counter: state.news.counter,
  articles: state.news.articles,
  options: state.news.options,
  filterSource: state.news.source,
});

const mapDispatch = {
  setCountry: newsActions.setCountry,
  setCategory: newsActions.setCategory,
  setSource: newsActions.setSource,
  addHistory: newsActions.addHistory,
  setSelectedArticle: newsActions.setSelectedArticle,
  getNews: newsActions.getNews,
  increment: newsActions.increment,
};

const connector = connect(mapState, mapDispatch);
const HomeRedux = connector(HomeScreen);

export { HomeRedux as HomeScreen };
