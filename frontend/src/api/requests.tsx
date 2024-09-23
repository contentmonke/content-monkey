import axios from "axios";
import { Review } from "../models/Models";

const URL = 'http://localhost:8080/api';

export const api = {
  reviews: {

    getReview() {
      console.log("api.reviews.get()")
    },

    async createReview(review: Review) {
      return (
        axios.post(URL + "/reviews", review)
      );

    },
  },
}