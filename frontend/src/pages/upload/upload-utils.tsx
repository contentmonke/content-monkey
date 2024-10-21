import { api } from "../../api/requests";

export async function uploadFile(formData: any, setUploadResults: any, setIsLoading: any) {
  setIsLoading(true)
  api.reviews.uploadFile(formData)
    .then((response) => {
      console.log(response.data);
      setUploadResults(response.data);
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      setIsLoading(false);
    })
}

export async function uploadReviews(uploadResults: any, userId: any, setIsLoading: any) {
  setIsLoading(true)
  api.reviews.confirmUploads(uploadResults, userId)
    .then((response) => {
      console.log(response.data);
      setIsLoading(false);
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      setIsLoading(false);
    })
}