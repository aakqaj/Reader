import { createStore } from 'vuex'
import { BookDetails } from './BookDetails'
import { BookList } from './SearchBookList'
import { BookSource } from './BookSource'
import {Bookshelf} from "./Bookshelf"
import {BookState} from "./BookState"


const store = createStore({
  modules: {
    BookDetails,
    BookList,
    BookSource,
    Bookshelf,
    BookState
  },
  state() {
    return {}
  },

  mutations: {},
  actions: {}
})

export { store }
