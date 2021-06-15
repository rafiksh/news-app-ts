export interface News {
  counter: number;
  totalResults: number;
  status: string;
  source: string;
  articles: Article[];
  selectedArticle: Article;
  history: History[];
  options: GetNewsBody;
}
export interface Article {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
export interface History {
  date: string;
  url: string;
  title: string;
}
export interface GetNewsBody {
  country: "eg" | "ae";
  category: "sports" | "business";
}
