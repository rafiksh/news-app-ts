import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../screens/home.screen";
import { HistoryScreen } from "../screens/history.screen";
import { ArticleScreen } from "../screens/article.screen";
import {
  BottomTabParamList,
  HomeTabParamList,
  HistoryTabParamList,
} from "../../types";

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
}) => {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen
        name="Home"
        component={HomeTabNavigator}
        options={{
          tabBarIcon: () => <TabBarIcon name="home" />,
        }}
      />
      <BottomTab.Screen
        name="History"
        component={HistoryTabNavigator}
        options={{
          tabBarIcon: () => <TabBarIcon name="hourglass" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const HomeTabStack = createStackNavigator<HomeTabParamList>();

const HomeTabNavigator = () => {
  return (
    <HomeTabStack.Navigator>
      <HomeTabStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: "Home" }}
      />
      <HomeTabStack.Screen
        name="ArticleScreen"
        component={ArticleScreen}
        options={{ headerTitle: "Article" }}
      />
    </HomeTabStack.Navigator>
  );
};

const HistoryTabStack = createStackNavigator<HistoryTabParamList>();

const HistoryTabNavigator = () => {
  return (
    <HistoryTabStack.Navigator>
      <HistoryTabStack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{ headerTitle: "History" }}
      />
    </HistoryTabStack.Navigator>
  );
};
