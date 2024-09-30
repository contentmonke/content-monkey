import { Container, Stack, Typography } from "@mui/material";
import { MediaType } from "../../models/Models";
import { fieldContent, fieldLabel, resultImage, resultImageContainer } from "../../style/review-page";

const bookFields = [
  "Title",
  "Authors",
  "Publisher",
  "Published",
  "Page Count"
];

export function handleSearchFields(mediaType: MediaType, searchEntity: any, location = "") {

  let minImgSize, maxImgSize, py, fontSize, width;

  if (location == "list") {
    minImgSize = 100;
    maxImgSize = 150;
    fontSize = 14;
    width = 100;
    py = 0;
  } else {
    minImgSize = 150;
    maxImgSize = 180;
    fontSize = 15;
    width = 110;
    py = 0.5;
  }

  if (mediaType === MediaType.BOOK) {

    const fieldValues = [
      searchEntity.title,
      searchEntity.authors,
      searchEntity.publisher,
      searchEntity.publishedDate,
      searchEntity.pageCount
    ];

    return (
      <Container disableGutters sx={{ display: 'flex', maxWidth: '750px' }}>
        <Container disableGutters sx={{ ...resultImageContainer, minWidth: minImgSize, maxWidth: maxImgSize }}>
          < img
            src={searchEntity.thumbnail}
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

export function getStartIndex() {

}