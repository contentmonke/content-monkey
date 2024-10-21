import { Divider } from "@mui/material";
import "./UploadPage.css"
import CustomPagination from "../../components/CustomPagination";
import Button from "../../components/button/Button";

function UploadResults({ uploadResults, page, handlePageChange, scrollRef, handleEditClick }: any) {

  const formatDate = (date: any) => {
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
                          src={uploadResult.searchEntity.thumbnail}>
                        </img>
                      </div>
                      <div className="review-info">
                        <div>{uploadResult.searchEntity.title}</div>
                        <div>{uploadResult.searchEntity.authors}</div>
                        <br />
                        <div className="review-dates">
                          {formatDate(uploadResult.reviewEntity.startDate)} &mdash; {formatDate(uploadResult.reviewEntity.endDate)}
                        </div>
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