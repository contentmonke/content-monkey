import axios from "axios";
import { Review } from "../models/Models";

const URL = 'http://localhost:8080/api';

export const api = {
  reviews: {

    fetchReview() {
      console.log("api.reviews.get()")
    },

    async createReview(review: Review) {
      return (
        await axios.post(`${URL}/reviews`, review)
      );

    },
  },
  search: {
    async fetchSearch({ title }: any) {
      return (
        await axios.get(`${URL}/search`, {
          params: { bookTitle: title }
        })
      );
    }
  },

}