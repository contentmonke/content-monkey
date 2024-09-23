import axios from "axios";
import { Review } from "../models/Models";

const URL = 'http://localhost:8080/api';

export const api = {
  reviews: {
    getReview() {
      console.log("api.reviews.get()")
    },
    async createReview(review: Review) {
      console.log("api.reviews.createReview()")
      axios.post(URL + "/reviews",
        review
      )
        .then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });;

    },
  },
}