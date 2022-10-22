import { toRaw } from 'vue'
import { StoreOptions } from 'vuex'
import { BookSource as BookSource_ } from '../../assets/interface/BookSource'
import { DetailsRequest, isSave } from '../../assets/utils/DetailsRequest'
import { existsCursor } from '../../assets/utils/requestBookCursor'

export const BookState = {
  state() {
    return {
      showTools: false,
      bookNameToCursor: Number
    }
  },

  mutations: {
    setStateShowTools(state: { showTools: boolean }, val: boolean) {
      state.showTools = val
    },
    setCursor(state: { bookNameToCursor: Number }, cursor: number) {
      state.bookNameToCursor = cursor
    }
  },
  actions: {
    setCursor({ commit, rootState }, cursor: number) {
      const state_ = toRaw(rootState)
      const bookDetail = state_.BookDetails.bookDetail
      let bookname = bookDetail.BookName

      //不存在游标 将游标设置为 0
      if (!existsCursor(bookname)) {
        console.log(`<BookState> 不存在游标 ${bookname} `)

        localStorage.setItem(bookname, '0')
        commit('setCursor', 0)
      } else {
        localStorage.setItem(bookname, cursor.toString())
        commit('setCursor', cursor)
      }
    }
  }
}
