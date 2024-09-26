import { Stack, Typography } from "@mui/material";
import { MediaType } from "../../models/Models";

const selectedSx = {
  flexGrow: 1,
  pt: 1,
  pr: 2,
  pl: 3
}

const listSx = {
  flexGrow: 1,
  pt: 0,
  pr: 1,
  pl: 3
}

const bookFields = [
  "Title",
  "Authors",
  "Publisher",
  "Published",
  "Page Count"
];

export function handleSearchFields(mediaType: MediaType, searchEntity: any, location = "") {

  let imgSize, sx, py, fontSize, width;

  if (location == "list") {
    imgSize = 100;
    sx = listSx;
    fontSize = 14;
    width = 100;
    py = 0;
  } else {
    imgSize = 150;
    py = 0.5;
    sx = selectedSx;
    fontSize = 15;
    width = 110;
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
      <>
        <Stack direction={'row'}>
          <div style={{ alignContent: 'center', width: 'auto' }}>
            <img src={searchEntity.thumbnail} style={{ width: '80%', height: 'auto', minWidth: imgSize }}></img>
          </div>
          <Stack direction={'column'} sx={{ ...sx }} my={2}>
            {bookFields.map((field, index) => (
              <Stack key={index} direction={'row'} py={py}>
                <Typography fontSize={fontSize} minWidth={width} textAlign={'right'} fontWeight={'bold'} pr={2}>{field}</Typography>
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
                    textOverflow={'ellipse'}>{fieldValues[index]}</Typography>
                }
              </Stack>
            ))}
          </Stack>
        </Stack >
      </>
    );
  }

  return <></>
}