import axios from "axios";
import { MediaType, Review } from "../models/Models";
import { useAuth0 } from "@auth0/auth0-react";

const URL = 'http://localhost:8080/api';

export const api = {
  // Review API Routes
  reviews: {
    fetchReview() {
      console.log("api.reviews.get()")
    },

    async createReview(review: Review) {
      return (
        await axios.post(`${URL}/reviews`, review)
      );
    },

    async uploadFile(file: any) {
      return (await axios.post(`${URL}/reviews/upload`, file, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }))
    },

    async confirmUploads(uploadResults: any, userId: any) {
      // return ({ data: [] });
      return (
        await axios.post(`${URL}/reviews/confirmUploads/${userId}`, uploadResults)
      );
    },

    async updateUpVotes(userId: any, reviewId: number, addedVote: boolean) {
      console.log(reviewId);
      return (
        await axios.get(`${URL}/reviews/upVotes/${userId}`, {
          params: {
            reviewId: reviewId,
            addedVote: addedVote
          }
        })
      );
    },

    async updateDownVotes(userId: any, reviewId: number, addedVote: boolean) {
      console.log(reviewId);
      return (
        await axios.get(`${URL}/reviews/downVotes/${userId}`, {
          params: {
            reviewId: reviewId,
            addedVote: addedVote
          }
        })
      );
    }
  },

  // Search API Routes
  search: {
    async fetchSearch({ title }: any) {
      return (
        await axios.get(`${URL}/search`, {
          params: { bookTitle: title }
        })
      );
    }
  },
  searchMovie: {
    async fetchMoviesSearch(title: any) {
      return (
        await axios.get(`${URL}/search/movie/${title}`)
      )
    }
  },
  searchTV: {
    async fetchTVSearch(title: any) {
      return (
        await axios.get(`${URL}/search/tv/${title}`)
      )
    }
  },
  searchVideoGames: {
    async fetchVideoGameSearch(title: any) {
      return (
        await axios.get(`${URL}/search/videoGame/${title}`)
      )
    }
  },
  searchAll: {
    async fetchAllSearch(title: any) {
      return (
        await axios.get(`${URL}/search/any/${title}`)
      )
    }
  },

  // Media API Routes
  media: {
    async fetchMedia(media: any) {
      const mediaEntity = {
        mediaTitle: media.title ? media.title : media.mediaTitle,
        mediaDuration: media.pageCount,
        author: media.authors ? media.authors[0] : "",
        description: media.description,
        thumbnail: media.thumbnail,
        mediaType: media.mediaType
      }
      return (
        await axios.post(`${URL}/media/`, mediaEntity)

      );
    },

    async fetchStreamingServices(media:any, country: string) {
      let mediaTitle = media.title ? media.title : media.mediaTitle
      return (
        await axios.get(`${URL}/media/streamingServices/${mediaTitle}/${country}`)
      )
    },

    async fetchMediaList(mediaIds: any) {
      return (
        await axios.post(`${URL}/media/list`, mediaIds)
      );
    },
  },

  // User API Routes
  user: {
    async fetchUser(username: any) {
      return (await axios.post(`${URL}/user/`,
        {
          name: username
        }));
    }
  },

  // Commment API Routes
  comments: {
    async createComment(comment: any) {
      return (
        await axios.post(`${URL}/comments`, comment)
      );
    },

    async getComments(commentIds: any, pageNumber: any, pageSize: any) {
      return (
        await axios.post(`${URL}/comments/getComments`, commentIds,
          {
            params: {
              pageNumber: pageNumber,
              pageSize: pageSize,
            }

          })
      );
    }
  },
  discussions: {
    async getDiscussionBoard(discussionId: any) {
      return (
        await axios.get(`${URL}/discussionBoard/get/${discussionId}`)
      )
    },
    async fetchDiscussionPosts(discussionId: any) {
      return (
        await axios.get(`${URL}/discussionBoard/getDiscussionPosts/${discussionId}`)
      )
    },
    async createDiscussionPost(discussionId: any, postBody: any, username: any) {
      console.log(`${URL}/discussionBoard/createPost/${discussionId}/${postBody}/${username}`)

      return (
        await axios.post(`${URL}/discussionBoard/createPost/${discussionId}/${postBody}/${username}`)
      )
    },
    async updateUpVotes(userId: any, reviewId: number, addedVote: boolean) {
      console.log(reviewId);
      return (
        await axios.get(`${URL}/reviews/upVotes/${userId}`, {
          params: {
            reviewId: reviewId,
            addedVote: addedVote
          }
        })
      );
    },

    async updateDownVotes(userId: any, reviewId: number, addedVote: boolean) {
      console.log(reviewId);
      return (
        await axios.get(`${URL}/reviews/downVotes/${userId}`, {
          params: {
            reviewId: reviewId,
            addedVote: addedVote
          }
        })
      );
    }
  },
  discussionComments: {
    async createDiscussionComment(userId: any, body: any, postId: any) {
      return (
        await axios.post(`${URL}/discussionPostComments/${userId}/${body}/${postId}`)
      );
    },

    async getDiscussionComments(commentIds: any) {
      return (
        await axios.post(`${URL}/discussionPostComments/getComments`, commentIds)
      );
    }
  }
}