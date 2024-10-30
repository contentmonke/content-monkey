import { api } from "../../api/requests";

function verifyUploads(data: any) {
  let results = [];
  data.forEach((result: any) => {
    if (result.searchEntity !== null) {
      results.push(result);
    }
  })
  return results;
}

export async function uploadFile(formData: any, setUploadResults: any, setIsLoading: any) {
  setIsLoading(true)
  api.reviews.uploadFile(formData)
    .then((response) => {
      console.log(response.data);
      console.log(JSON.stringify(response.data));
      setUploadResults(verifyUploads(response.data));
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      setIsLoading(false);
    })
}

export async function uploadReviews(uploadResults: any, userId: any, setCreatedReviews: any, setIsLoading: any, setIsSuccess, setIsError: any) {
  setIsLoading(true);
  api.reviews.confirmUploads(uploadResults, userId)
    .then((response) => {
      console.log(response.data);
      let mediaIds = [];
      response.data.forEach((data: any) => {
        if (data !== null) mediaIds.push(data.mediaId);
      });
      setIsSuccess(true);
      return api.media.fetchMediaList(mediaIds);
    })
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setCreatedReviews(response.data);
    })
    .catch((e) => {
      console.error(e);
      setIsError(true);
    })
    .finally(() => {
      setIsLoading(false);
    })
}

export const formatDate = (date: any) => {
  if (!date) {
    return "";
  }
  const reviewDate = new Date(date);
  reviewDate.setHours(reviewDate.getHours() - 4); // Subtract 4 hours for EST
  return (
    reviewDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }) + " " +
    reviewDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  );
}

export const getYear = (date: any) => {
  const reviewDate = new Date(date);
  return reviewDate.getFullYear();
}