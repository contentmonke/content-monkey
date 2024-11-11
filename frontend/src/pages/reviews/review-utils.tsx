import { Container, Stack, Typography } from "@mui/material";
import { MediaType } from "../../models/Models";
import { fieldContent, fieldLabel, resultImage, resultImageContainer } from "../../style/review-page";
import { api } from "../../api/requests";

const bookFields = [
  "Title",
  "Authors",
  "Publisher",
  "Published",
  "Page Count"
];

const movieFields = [
  "Title",
  "Release Date",
]

const anyFields = [
  "Title",
  "Release Date",
  "Media Type"
]

export function handleSearchFields(mediaType: string, searchEntity: any, location = "") {

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
    width = 120;
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


  if (mediaType === MediaType.MOVIE || mediaType === MediaType.TV_SHOW || mediaType === MediaType.VIDEO_GAME) {

    const fieldValues = [
      searchEntity.title,
      searchEntity.releaseDate,
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
          {movieFields.map((field, index) => (
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

  if (mediaType === MediaType.UNSELECTED) {
    const fieldValues = [
      searchEntity.title,
      searchEntity.releaseDate ? searchEntity.releaseDate : searchEntity.publishedDate,
      searchEntity.mediaType
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
          {anyFields.map((field, index) => (
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

export async function loadUser(username: string, setUser: any) {
  api.user.fetchUser(username)
    .then((response) => {
      if (response.data[0].posts_liked === null) {
        response.data[0].posts_liked = [];
      }
      if (response.data[0].posts_disliked === null) {
        response.data[0].posts_disliked = [];
      }
      setUser(response.data[0])
    })
    .catch(() => {
      console.error("Error retrieving user information")
    })
}

export async function updateUpVotes(user: any, reviewId: any, addedVote: any, setUser: any, setNeedsUpdate: any) {
  api.reviews.updateUpVotes(user.id, reviewId, addedVote)
    .then((response) => {
      console.log(response.data);
      return loadUser(user.name, setUser);
    })
    .catch(() => {
      console.log("error updating upVotes");
    })
    .finally(() => {
      setNeedsUpdate(true)
    })
}

export async function updateDownVotes(user: any, reviewId: any, addedVote: any, setUser: any, setNeedsUpdate) {
  api.reviews.updateDownVotes(user.id, reviewId, addedVote)
    .then((response) => {
      console.log(response.data);
      return loadUser(user.name, setUser);
    })
    .catch(() => {
      console.log("error updating upVotes");
    })
    .finally(() => {
      setNeedsUpdate(true)
    })
}