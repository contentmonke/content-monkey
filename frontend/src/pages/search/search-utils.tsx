import { api } from "../../api/requests";
import { MediaType } from "../../models/Models";


export async function loadSearchResults(mediaType: MediaType, title: String, setResults: any, setIsLoading: any) {
  setIsLoading(true)
  if (mediaType === MediaType.BOOK) {
    api.search.fetchSearch({ title })
      .then((response) => {
        setResults(response.data)
      })
      .catch(() => {
        console.error("Error fetching search results");
      })
      .finally(() => {
        setIsLoading(false);
      })
  }
  return [];
}