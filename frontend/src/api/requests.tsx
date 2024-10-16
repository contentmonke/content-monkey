import axios from "axios";
import { MediaType, Review } from "../models/Models";
import { useAuth0 } from "@auth0/auth0-react";

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
    async uploadReviews(file: any) {
      return (await axios.post(`${URL}/reviews/upload`, file, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }))
    }
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
    async fetchMedia(media: any) {
      const mediaEntity = {
        mediaTitle: media.title,
        mediaDuration: media.pageCount,
        author: media.authors[0],
        description: media.description,
        thumbnail: media.thumbnail,
        mediaType: "Book"
      }
      // const mediaEntity = {
      //   mediaTitle: "superLongAndNotRealMedia",
      //   mediaDuration: 100,
      //   author: "Jane Doe",
      //   description: "This is the description",
      //   thumbnail: null,
      //   mediaType: "Book"
      // }
      return (
        await axios.post(`${URL}/media/`, mediaEntity)

      );
    },
    async fetchMediaList(mediaIds: any) {
      return (
        await axios.post(`${URL}/media/list`, mediaIds)
      );
    },
  },
  user: {
    async fetchUser(username: any) {
      return (await axios.post(`${URL}/user/`,
        {
          name: username
        }));
    }
  }
}