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
  else if (mediaType == MediaType.MOVIE) {
    api.searchMovie.fetchMoviesSearch( title )
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
  else if (mediaType == MediaType.TV_SHOW) {
    api.searchTV.fetchTVSearch( title )
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
  else if (mediaType == MediaType.VIDEO_GAME) {
    api.searchVideoGames.fetchVideoGameSearch( title )
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
  else if (mediaType == MediaType.UNSELECTED) {
    api.searchAll.fetchAllSearch( title )
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