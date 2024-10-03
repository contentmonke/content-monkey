import { Container, Typography } from "@mui/material";
import { api } from "../../api/requests";
import { Media, MediaLabel, MediaType } from "../../models/Models";
import { fieldContent, fieldLabel, resultImage, resultImageContainer } from "../../style/review-page";

export async function fetchMedia(media: any, setMedia: any, setLabels: any, setIsLoading: any, setIsError: any, setDoneSearching: any) {
  setIsLoading(true);
  // let mediaId = parseInt(idString);
  api.media.fetchMedia(media)
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