import { combineReducers } from "@reduxjs/toolkit";

import { newsReducer } from "./slice/news/news.slice";

const rootReducer = combineReducers({
  news: newsReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export { rootReducer };
