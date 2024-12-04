import { Container, Typography } from "@mui/material";
import { api } from "../../api/requests";
import { Media, MediaLabel, MediaType } from "../../models/Models";
import { fieldContent, fieldLabel, resultImage, resultImageContainer } from "../../style/review-page";
import { DateTime } from 'luxon';

export async function fetchMedia(media: any, setMedia: any, setStreamingService: any, setLabels: any, setIsLoading: any, setIsError: any, setDoneSearching: any) {
  setIsLoading(true);
  // let mediaId = parseInt(idString);
  api.media.fetchMedia(media)
    .then((response) => {
      console.log(response.data);
      setMedia(response.data);
      setStreamingService(response.data.streamingService)
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

export async function fetchStreamingServices(media: any, countryCode: any, setStreamingService: any, setIsLoading: any, setIsError: any) {
  setIsLoading(true);
  api.media.fetchStreamingServices(media, countryCode)
    .then((response) => {
      console.log(response.data);
      setStreamingService(response.data)
      setIsError(false);
    })
    .catch((error) => {
      setStreamingService("");
      console.log(error)
      setIsError(true);
    })
    .finally(() => {
      setIsLoading(false)
    });
}

export async function fetchMediaList(mediaIds: any, setMediaList: any) {
  // let mediaId = parseInt(idString);
  api.media.fetchMediaList(mediaIds)
    .then((response) => {
      console.log(response.data);
      setMediaList(response.data);
    })
    .catch((error) => {
      setMediaList([]);
      console.log(error)
    })
}

export async function fetchComments(commentIds: any, pageNumber: any, setComments: any, setIsLoading: any) {
  setIsLoading(true);
  api.comments.getComments(commentIds, pageNumber, 10)
    .then((response) => {
      console.log(response.data);
      setComments((prevItems) => {
        const currentItems = prevItems || [];
        const newItems = []
        response.data.forEach(element => {
          if (!currentItems.some(item => item.id === element.id)) {
            newItems.push(element);
          }
        });
        return [...currentItems, ...newItems]
      });
    })
    .catch((error) => {
      setComments([]);
      console.log(error)
    })
    .finally(() => {
      setIsLoading(false)
    });
}

export async function createComment(comment: any, setBody: any, setIsLoading: any, setIsSuccess: any, setIsError: any, setNeedsUpdate: any) {
  setIsLoading(true);
  api.comments.createComment(comment)
    .then((response) => {
      console.log(response.data);
      setIsSuccess(true)
    })
    .catch((error) => {
      console.log(error)
      setIsError(true)
    })
    .finally(() => {
      setIsLoading(false)
      setNeedsUpdate(true)
      setBody("")
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


export function handleMediaFields(mediaType: string, media: Media) {

  let minImgSize, maxImgSize, py, fontSize, width;

  const bookFields = [
    "Title",
    "Authors",
    "Page Count"
  ];

  minImgSize = 150;
  maxImgSize = 180;
  fontSize = 15;
  width = 110;
  py = 0.5;

  if (mediaType === MediaType.BOOK) {

    const fieldValues = [
      media.mediaTitle,
      media.author,
      media.mediaDuration.toString()
    ];

    return (
      <Container disableGutters sx={{ display: 'flex', maxWidth: '750px' }}>
        <Container disableGutters sx={{ ...resultImageContainer, minWidth: minImgSize, maxWidth: maxImgSize }}>
          < img
            src={media.thumbnail}
            style={{ ...resultImage }}>
          </img>
        </Container >
        <Container disableGutters sx={{ mt: 1 }}>
          {bookFields.map((field, index) => (
            <Container disableGutters sx={{ display: 'flex', py: py }} key={index}>
              <Container disableGutters sx={{ width: 'auto' }}>
                <Typography
                  sx={{
                    ...fieldLabel,
                    fontSize: fontSize,
                    minWidth: width
                  }}>
                  {field}
                </Typography>
              </Container>
              <Container disableGutters sx={{ ...fieldContent }}>
                {Array.isArray(fieldValues[index]) ?
                  <>
                    {fieldValues[index].map((fieldValue, i) => (
                      <Typography
                        key={i}
                        fontSize={fontSize}>
                        {fieldValue}{(i !== fieldValues[index].length - 1) ? ',\u00A0' : ""}
                      </Typography>
                    ))}
                  </>
                  :
                  <Typography
                    fontSize={fontSize}
                    textOverflow={'ellipse'}>
                    {fieldValues[index]}
                  </Typography>
                }
              </Container>
            </Container>
          ))}
        </Container>
      </Container >
    );
  }

  return <></>
}

export function getRelativeDateString(date: Date) {
  // convert UTC to LocalTime
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return DateTime.fromJSDate(localDate).toRelative()
}

export function getDateString(date: Date) {
  // convert UTC to LocalTime
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return (
    localDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }) + " " +
    localDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  );
}