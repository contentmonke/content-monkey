
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

export enum MediaType {
  BOOK = "Book",
  MOVIE = "Movie",
  TV_SHOW = "TV Show",
  VIDEO_GAME = "Video Game",
  UNSELECTED = "---"
}