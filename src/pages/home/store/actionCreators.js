import axios from "axios";
import { fromJS } from "immutable";
import * as constants from "./constants";
const changeHomeData = result => ({
  type: constants.CHANGE_HOME_DATA,
  topicList: result.topicList,
  articleList: result.articleList,
  recommendList: result.recommendList
});
export const getHomeInfo = () => {
  return dispatch => {
    axios
      .get("/api/home.json")
      .then(res => {
        const result = res.data.data;
        console.log(result);
        dispatch(changeHomeData(result));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const addHomeList = (list, nextPage) => ({
  type: constants.ADD_ARTICLE_LIST,
  list: fromJS(list),
  nextPage
});

export const getMoreList = page => {
  return dispatch => {
    axios
      .get("/api/homeList.json?page=" + page)
      .then(res => {
        const result = res.data.data;
        dispatch(addHomeList(result, page + 1));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const toggleTopShow = show => ({
  type: constants.TOGGLE_SCROLL_TOP,
  show
});
