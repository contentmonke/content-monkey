import dayjs from "dayjs";
import { api } from "./requests";

/*
 * Formatting and Error checking before going to the API
 */

export async function createReview(params: any): Promise<any> {
  // body, mediaId, rating, startDate, endDate
  // Validate params
  if (params.body === "" || params.body === null || params.rating < 0 || params.rating > 5) {
    throw new Error("Invalid review parameters");
  }

  let userId = 0;   // TODO - get this
  let commentIds: number[] = [];
  let mediaId = 0;  // TODO - pass this in from the CreateReviewModal.tsx
  let dateCreated = dayjs();
  let upVotes = 0;
  let downVotes = 0;

  return api.reviews.createReview({ ...params, userId, commentIds, dateCreated, mediaId, upVotes, downVotes });

}