import axios from "axios";
import { MediaType, Review } from "../models/Models";

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
  media: {
    async fetchMedia({ mediaId }: any) {

      return (
        // await axios.get(`${URL}/media`, mediaId)
        // await axios.get(`${URL}/reviews`, mediaId)
        {
          data: {
            mediaType: MediaType.BOOK,
            title: "Harry Potter and the Sorcerer's Stone",
            authors: ['J. K. Rowling'],
            description: "Rescued from the outrageous neglect of his aunt and uncle, a young boy with a great destiny proves his worth while attending Hogwarts School for Witchcraft and Wizardry.",
            pageCount: "422",
            publishedDate: "1999",
            publisher: "Large Print Press",
            thumbnail: "http://books.google.com/books/content?id=utWSuAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"

          }
        }
      );
    }
  }

}