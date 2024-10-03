import dayjs from "dayjs";
import { api } from "./requests";

/*
 * Formatting and Error checking before going to the API
 */

export async function createReview(params: any): Promise<any> {
  // Validate params
  if (params.body === "" || params.body === null || params.rating < 0 || params.rating > 5 || params.userId === undefined || params.mediaId === undefined) {
    throw new Error("Invalid review parameters");
  }

  let commentIds: number[] = [];
  let dateCreated = dayjs();
  let upVotes = 0;
  let downVotes = 0;

  return api.reviews.createReview({ ...params, commentIds, dateCreated, upVotes, downVotes });

}