import { api } from "../../api/requests";
import { MediaLabel, MediaType } from "../../models/Models";

export async function fetchMedia(mediaTitle: string, setMedia: any, setLabels: any, setIsLoading: any, setIsError: any, setDoneSearching: any) {
  setIsLoading(true);
  // let mediaId = parseInt(idString);
  api.media.fetchMedia( mediaTitle )
    .then((response) => {
      console.log(response.data);
      setMedia(response.data);
      setLabels(getLabels(response.data.mediaType));
      setIsError(false);
    })
    .catch((error) => {
      setMedia(null);
      console.log(error)
      setIsError(true);
    })
    .finally(() => {
      setIsLoading(false)
      setDoneSearching(true)
    });
}

export const getLabels = (mediaType: MediaType): MediaLabel | null => {
  if (mediaType === MediaType.BOOK) {
    const mediaLabel: MediaLabel = {
      createdByLabel: "Written by:",
      creatorsLabel: "Authors:",
      creationDate: "Published on:",
    }
    return mediaLabel;
  }
  return null;
}