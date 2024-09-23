import { Review } from "../models/Models";
import { api } from "./requests";

export function createReview(params: any): any {
  // body, mediaId, rating, startDate, endDate
  // Validate params
  if (params.body === "" || params.body === null || params.rating < 0 || params.rating > 5) {
    throw new Error("Invalid review parameters");
  }

  let userId = 0;   // TODO - get this
  let commentIds = [];
  let mediaId = 0;  // TODO - pass this in from the CreateReviewModal.tsx
  let dateCreated = Date.now();
  let upVotes = 0;
  let downVotes = 0;

  // return api.reviews.createReview({ ...params, userId, dateCreated, upVotes, downVotes });

}