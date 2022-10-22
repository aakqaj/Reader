// import { StoreOptions } from "vuex";
import { toRaw } from 'vue'
import { SearchRequest } from '../../assets/utils/SearchRequest'

// onMounted(async () => {
//   const searchReq = new SearchRequest();
//   await searchReq.init("笔趣阁")
//   // await searchReq.getRequestHtml("诡秘")

//   await searchReq.getTestHtml("奇异")
//    searchReq.test()

// })
interface BookList {
  Author: string
  BookName: string
  DetailUrl: string
  ImgURL: string
  Intro: string
  NewChapter: string
  NewChapterDate: string
  Type: string
  WordsCount: string
}

export const BookList = {
  state() {
    return {
      bookList: {}
    }
  },

  mutations: {
    setBookList(state: { bookList: BookList }, bookList_: any) {
      state.bookList = bookList_
    }
  },
  actions: {
    async setBookList({ commit, rootState }, bookname:string) {
      const state_ = toRaw(rootState)
      const bookSource = state_.BookSource.bookSource
    
      const searchReq = new SearchRequest()
      await searchReq.init(bookSource)
      await searchReq.getRequestHtml(bookname)

      // await searchReq.getTestHtml(bookname)
      const blist = await searchReq.getBookList()

      commit('setBookList', blist)
    }
  }
}
