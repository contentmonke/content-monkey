import { api } from "../../api/requests";
import { MediaLabel, MediaType } from "../../models/Models";

export async function fetchMedia(idString: string, setMedia: any, setLabels: any, setIsLoading: any, setIsError: any) {
  setIsLoading(true);
  let mediaId = parseInt(idString);
  api.media.fetchMedia({ mediaId })
    .then((response) => {
      console.log(response.data);
      setMedia(response.data);
      setLabels(getLabels(response.data.mediaType));
      setIsError(false);
    })
    .catch((error) => {
      console.log(error)
      setIsError(true);
    })
    .finally(() => {
      setIsLoading(false)
    });
}

export const getLabels = (mediaType: MediaType): MediaLabel | null => {
  if (MediaType.BOOK) {
    const mediaLabel: MediaLabel = {
      createdByLabel: "Written by:",
      creatorsLabel: "Authors:",
      creationDate: "Published on:",
    }
    return mediaLabel;
  }
  return null;
}