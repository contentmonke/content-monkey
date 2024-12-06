import dayjs from "dayjs";
import { api } from "./requests";

/*
 * Formatting and Error checking before going to the API
 */

export async function createReview(params: any): Promise<any> {
  // Validate params
  if (params.rating > 5 || params.userId === undefined || params.mediaId === undefined) {
    throw new Error("Invalid review parameters");
  }

  let commentIds: number[] = [];
  let dateCreated = dayjs();
  let upVotes = 0;
  let downVotes = 0;
  let progress = "Finished";

  return api.reviews.createReview({ ...params, commentIds, dateCreated, upVotes, downVotes, progress });

}