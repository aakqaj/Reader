import { toRaw } from 'vue'
import { getBookshelfInfo } from '../../assets/utils/requestBookShelf'

export const Bookshelf = {
  state() {
    return {
      bookList: {}
    }
  },
  mutations: {
    reloadBookshelf(state: any) {
      state.bookList = getBookshelfInfo()
    }
  }
}
