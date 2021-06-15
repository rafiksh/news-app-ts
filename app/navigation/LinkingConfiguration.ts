import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          HomeTab: {
            screens: {
              HomeScreen: "home",
              ArticleScreen: "article",
            },
          },
          HistoryTab: {
            screens: {
              HistoryScreen: "history",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
