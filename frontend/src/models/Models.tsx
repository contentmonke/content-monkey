
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

export type VolumeInfo = {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  thumbnail: string;
  pageCount: string;
  description: string
}

export enum MediaType {
  BOOK = "Book",
  MOVIE = "Movie",
  TV_SHOW = "TV Show",
  VIDEO_GAME = "Video Game",
  UNSELECTED = "---"
}