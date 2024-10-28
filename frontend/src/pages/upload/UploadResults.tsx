import { Divider, Rating } from "@mui/material";
import "./UploadPage.css"
import CustomPagination from "../../components/CustomPagination";
import Button from "../../components/button/Button";
import { formatDate } from "./upload-utils";

function UploadResults({ uploadResults, page, handlePageChange, scrollRef, handleEditClick }: any) {

  return (
    <>
      {
        uploadResults.length > 0 ?
          <div className="upload-list">
            <br />
            <div className="list-status">Successfully uploaded {uploadResults.length} reviews</div>
            <Divider component="li" sx={{ mb: 2 }} />
            {
              uploadResults.slice((page - 1) * 10, (page * 10)).map((uploadResult, index) => (
                <div key={index}>
                  <div className="list-item">
                    <div className="item-content">
                      <div>
                        < img className="item-img"
                          src={uploadResult.searchEntity?.thumbnail}>
                        </img>
                      </div>
                      <div className="review-info">
                        <div>{uploadResult.searchEntity?.title}</div>
                        <div>{uploadResult.searchEntity?.authors}</div>
                        <br />
                        <div className="review-dates">
                          {formatDate(uploadResult.reviewEntity.startDate)} &mdash; {formatDate(uploadResult.reviewEntity.endDate)}
                        </div>
                        <Rating
                          sx={{ my: 0, mr: 1 }}
                          value={uploadResult.reviewEntity.rating}
                          precision={0.5}
                          readOnly
                        />
                        <div>{uploadResult.reviewEntity.body}</div>
                      </div>
                    </div>
                    <div className="edit-button-container">
                      <Button
                        label={"Edit"}
                        onClick={() => handleEditClick(uploadResult)}
                        width={'100px'}
                      />
                    </div>
                  </div >
                  <Divider component="li" sx={{ my: 2 }} />
                </div>
              ))
            }
            <CustomPagination
              scrollRef={scrollRef}
              items={uploadResults}
              page={page}
              handlePageChange={handlePageChange} />
          </div >
          :
          <></>
      }
    </>
  );
}

export default UploadResults;