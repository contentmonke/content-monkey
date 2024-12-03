
export type Review = {
  userId: number,
  commentIds: number[],
  dateCreated: Date,
  body: String,
  mediaId: number,
  rating: number,
  upVotes: number,
  downVotes: number,
  startDate: Date | null,
  endDate: Date | null,
}

export type ReviewDTO = {
  id: number,
  userId: number,
  username: string,
  picture: string,
  commentIds: number[],
  dateCreated: Date,
  body: String,
  mediaId: number,
  rating: number,
  upVotes: number,
  downVotes: number,
}

export type VolumeInfo = {
  title: string,
  authors: string[],
  publisher: string,
  publishedDate: string,
  thumbnail: string,
  pageCount: string,
  description: string,
}

export type MediaLabel = {
  createdByLabel: string,
  creatorsLabel: string,
  creationDate: string,
}

export type Media = {
  id: number;
  mediaTitle: string;
  mediaType: string;
  author: string;
  mediaDuration: number;
  genre: string;
  description: string;
  averageRating: number;
  totalRatings: number;
  thumbnail: string;
  reviews: ReviewDTO[];
  numTotalReviews: number
  streamingService: string
}

export type UploadResult = {
  reviewEntity: Review,
  searchEntity: VolumeInfo
}

export type Comment = {
  id: number,
  userId: number,
  username: string,
  picture: string,
  reviewId: number,
  body: string,
  dateCreated: Date,
  upVotes: number,
  downVotes: number,
  replyIds: number[]
}

export enum MediaType {
  BOOK = "Book",
  MOVIE = "Movie",
  TV_SHOW = "TV Show",
  VIDEO_GAME = "Video Game",
  UNSELECTED = "---"
}

export type Group = {
  id: number,
  groupName: string,
  description: string,
  owner: number,
  picture: string | null,
  isPublic: boolean,
  members: number[],
  joinRequests: number[],
  discussionBoards: number[],
  dateCreated: Date
}

export type Post = {
  id: number,
  username: string,
  commentIds: number[],
  postBody: string,
  postDate: Date,
  upVotes: number,
  downVotes: number,
  picture: string
}

export type DiscussionComment = {
  id: number,
  userId: number,
  username: string,
  postId: number,
  body: string,
  dateCreated: Date,
  upVotes: number,
  downVotes: number,
  picture: string
}