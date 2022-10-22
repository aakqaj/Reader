import { toRaw } from 'vue'
import { StoreOptions } from 'vuex'
import { BookSource as BookSource_ } from '../../assets/interface/BookSource'
import { DetailsRequest } from '../../assets/utils/DetailsRequest'

export const BookSource = {
  state() {
    return {
      bookSourceList: [],
      bookSource: {}
    }
  },

  mutations: {
    setBookSourceList(state: { bookSourceList: BookSource_[] }, bookSourceList: BookSource_[]) {
      state.bookSourceList = bookSourceList
    },

    setBookSource(
      state: { bookSourceList: BookSource_[]; bookSource: BookSource_ },
      bookSourceName: string
    ) {
      //    = bookSource
      state.bookSource = toRaw(state.bookSourceList).filter((item) => item.SourceName == bookSourceName)[0]
    }
  },
  actions: {
    setBookSourceList({ commit }, bookSourceList: BookSource_[]) {
      commit('setBookSourceList', bookSourceList)
    },
    setBookSource({ commit }, bookSourceName: string) {
      commit('setBookSource', bookSourceName)
    }
  }
}
