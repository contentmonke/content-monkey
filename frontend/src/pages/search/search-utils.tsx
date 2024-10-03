import { api } from "../../api/requests";
import { MediaType } from "../../models/Models";


export async function loadSearchResults(mediaType: string, title: string, setResults: any, setIsLoading: any, setIsError: any) {
  setIsLoading(true)
  if (mediaType === MediaType.BOOK) {
    api.search.fetchSearch({ title })
      .then((response) => {
        console.log(response.data)
        setResults(response.data)
        setIsError(false);
      })
      .catch(() => {
        console.error("Error fetching search results");
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }
  return [];
}