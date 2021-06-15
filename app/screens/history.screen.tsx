import * as React from "react";
import { View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { Text } from "../components/styled/typography/typography.styled";
import { ActionRow } from "../components/styled/card/card.styled";
import { History } from "../store/slice/news";

import { newsActions } from "../store/slice/news/news.slice";
import { RootState } from "../store/store";

type ReduxProps = ConnectedProps<typeof connector>;
const HistoryScreen = (props: ReduxProps) => {
  const { history, deleteHistory } = props;

  const renderOptionRow = ({ item }: { item: History }) => (
    <ActionRow
      title={item.title}
      date={item.date}
      handlePress={() => deleteHistory(item.date)}
    />
  );

  return (
    <View style={styles.container}>
      {history.length === 0 && <Text>History is empty</Text>}
      <FlatList
        data={history}
        renderItem={renderOptionRow}
        keyExtractor={(item: any) => item.date}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapState = (state: RootState) => ({
  history: state.news.history,
});

const mapDispatch = {
  deleteHistory: newsActions.deleteHistory,
};

const connector = connect(mapState, mapDispatch);
const HistoryRedux = connector(HistoryScreen);

export { HistoryRedux as HistoryScreen };
