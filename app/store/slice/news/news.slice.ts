import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { trackPromise } from "react-promise-tracker";

import { News, GetNewsBody, Article } from ".";
import moment from "moment";

const initialState: News = {
  counter: 0,
  status: "nothing",
  source: "all",
  options: {
    country: "eg",
    category: "business",
  },
  selectedArticle: {
    source: {
      id: "",
      name: "",
    },
    author: "",
    title: "",
    description: "",
    url: "",
    urlToImage: "",
    publishedAt: "",
    content: "",
  },
  totalResults: 0,
  articles: [],
  history: [],
};

const getNews = createAsyncThunk(
  "getNewsThunk/",
  async ({ country, category }: GetNewsBody) => {
    const path = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=ca90dd1e4aa14d3ba5214491b3d90c1d`;
    const result = await trackPromise(axios.get(path));
    return result.data;
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {
    setNewsState: (state, action) => {
      return { ...state, ...action.payload };
    },
    increment: (state) => {
      state.counter++;
    },
    setCategory: (state, { payload }) => {
      state.options.category = payload;
    },
    setCountry: (state, { payload }) => {
      state.options.country = payload;
    },
    setSource: (state, { payload }) => {
      state.source = payload;
    },
    setSelectedArticle: (state, { payload }) => {
      const selected = state.articles.find(
        (article: Article) => article.url === payload
      );
      if (selected) state.selectedArticle = selected;
    },
    deleteHistory: (state, { payload }) => {
      state.history = state.history.filter((el) => el.date !== payload);
    },
    addHistory: (state, { payload }) => {
      state.history.unshift({
        date: moment(new Date()).format("hh:mm:ss A ddd MM-YYYY").toString(),
        url: payload.url,
        title: payload.title,
      });
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getNews.fulfilled, (state, { payload }: any) => {
      state.status = payload.status;
      state.totalResults = payload.totalResults;
      state.articles = payload.articles.map(
        ({ author, publishedAt, ...article }: Article): Article => {
          return {
            author:
              author === null
                ? "Unkown"
                : author.indexOf("<") === -1
                ? author
                : author.split(">")[1].split("<")[0],
            publishedAt: moment(publishedAt)
              .format("hh:mm A ddd MM-YYYY")
              .toString(),
            ...article,
          };
        }
      );
    });
  },
});

export const newsReducer = newsSlice.reducer;

export const newsActions = { ...newsSlice.actions, getNews };
