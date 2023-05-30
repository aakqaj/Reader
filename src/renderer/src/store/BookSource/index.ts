import { toRaw } from "vue";
import { BookSource as BookSource_ } from "../../assets/interface/BookSource";
// import { DetailsRequest } from '../../assets/utils/DetailsRequest'
import _, { isEqual } from "lodash";
export const BookSource = {
  state() {
    return {
      bookSourceList: [],
      bookSource: {},
    };
  },

  mutations: {
    setBookSourceList(
      state: { bookSourceList: BookSource_[] },
      bookSourceList: BookSource_[]
    ) {
      state.bookSourceList = bookSourceList;
    },

    setBookSource(
      state: { bookSourceList: BookSource_[]; bookSource: BookSource_ },
      bookSourceName: string
    ) {
      //    = bookSource
      state.bookSource = toRaw(state.bookSourceList).filter(
        (item) => item.SourceName == bookSourceName
      )[0];
    },

    setTestSource(
      state: { bookSource: BookSource_; bookSourceList: BookSource_[] },
      bookSource: BookSource_
    ) {
      state.bookSource = bookSource;
      state.bookSourceList.push(bookSource);
      state.bookSourceList = _.unionWith(state.bookSourceList, isEqual);
    },

    removeSource(state: { bookSourceList: BookSource_[] }, sourceName: string) {
      state.bookSourceList = state.bookSourceList.filter(
        (item) => item.SourceName !== sourceName
      );
    },
  },
  actions: {
    setBookSourceList({ commit }, bookSourceList: BookSource_[]) {
      commit("setBookSourceList", bookSourceList);
    },
    setBookSource({ commit }, bookSourceName: string) {
      commit("setBookSource", bookSourceName);
    },
  },
};
