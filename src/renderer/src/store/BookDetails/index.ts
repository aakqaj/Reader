import { BookDetail } from "../../assets/interface/BookDeatils";
import { DetailsRequest } from "../../assets/utils/DetailsRequest";
import { readJsonFile, writeJsonFile } from "../../assets/utils/operationFile";

export const BookDetails = {
  state() {
    return {
      bookDetail: {},
    };
  },

  mutations: {
    setBookDetail(state: { bookDetail: BookDetail }, bookDetail: BookDetail) {
      state.bookDetail = bookDetail;
    },
  },
  actions: {
    async requestBookDetail({ commit }, bookDetail: BookDetail) {
      const detailReq = new DetailsRequest(bookDetail);
      commit("setBookDetail", await detailReq.getAllDataOfDetails());
    },

    async readBookDetails({ commit }, bookName: string) {
      const bookDetail = await readJsonFile(
        `./static/bookshelf/${bookName}/detail.json`
      );
      commit("setBookDetail", bookDetail);
    },

    async writeBookDetail({ commit }, bookDetail: BookDetail) {
      writeJsonFile(
        `./static/bookshelf/${bookDetail.BookName}/detail.json`,
        bookDetail
      );
    },
  },
};
