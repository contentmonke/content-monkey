import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { loadUser } from "../reviews/review-utils";
import { Media, UploadResult } from "../../models/Models";
import { SmallLoading } from "../../components/Loading";
import { uploadFile, uploadReviews } from "./upload-utils";
import './UploadPage.css';
import '../../components/button/Button.css'
import { uploadButton, uploadReviewsButton } from "../../style/upload-page";
import UploadResults from "./UploadResults";
import UploadPopup from "./UploadPopup";
import ConfirmUpload from "./ConfirmUpload";
import EditResultModal from './EditResultModal';
import SuccessAlert from '../../components/SuccessAlert';
import ErrorAlert from '../../components/ErrorAlert';
import { Divider } from '@mui/material';

function UploadPage() {
  const { user } = useAuth0();
  const uploadRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [userData, setUserData] = useState<any | undefined>(undefined);
  const [uploadResults, setUploadResults] = useState<UploadResult[]>([]);
  const [createdReviews, setCreatedReviews] = useState<Media[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [acknowledgedPopup, setAcknowledgedPopup] = useState(false);
  const [confirmUpload, setConfirmUpload] = useState(false);
  const [editingResult, setEditingResult] = useState<UploadResult>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user?.name === undefined) {
      return;
    }
    loadUser(user.name, setUserData);
  }, [user?.name]);

  const handleUpload = (event: any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    setCreatedReviews(null);
    uploadFile(formData, setUploadResults, setIsLoading);
  }

  const handleConfirmUpload = () => {
    setConfirmUpload(false);
    setUploadResults([]);
    uploadReviews(uploadResults, userData.id, setCreatedReviews, setIsLoading, setIsSuccess, setIsError);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  const handlePageChange = (value: any) => {
    setPage(value);
  }

  const closeEdit = () => {
    setEditingResult(null);
    setIsEditing(false);
  }

  const handleEditClick = (uploadResult: UploadResult) => {
    setEditingResult(uploadResult);
    setIsEditing(true);
  }

  return (
    <div className="upload-container">
      <br />
      <div className="instructions-container">
        <div >
          <div className="instructions-title">
            How to Upload your GoodReads csv
          </div>
          <br />
          <div className="instructions-header">
            <ul>
              <li>Navigate to goodreads.com and click "My Books" on the header</li>
              <li>On the left menu bar, there is a section called "Tools" - click "Import and export"</li>
              <li>Click the "Export Library" button to download your csv</li>
              <li>Click on the link provided below the "Export Library" button</li>
              <li>Upload this csv using the button to the right</li>
            </ul>
          </div>
        </div>
        <div className="upload-file-button">
          <label
            className="button"
            style={{ ...uploadButton }}
          >
            <CloudUploadIcon sx={{ marginRight: '10px' }} />
            <div>Upload files</div>
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              onChange={handleUpload}
              style={{ display: 'none' }}
            />
          </label>
          {uploadResults.length > 0 &&
            <div className="upload-reviews-button">
              <button
                className={'button'}
                style={{ ...uploadReviewsButton }}
                onClick={() => setConfirmUpload(true)}
              >
                Upload Reviews
              </button>
            </div>
          }
        </div>
      </div>
      <br />
      {isLoading && <SmallLoading />}
      {isEditing &&
        <EditResultModal
          open={isEditing}
          handleClose={closeEdit}
          result={editingResult}
        />
      }
      <UploadPopup
        open={uploadResults.length > 0 && acknowledgedPopup == false}
        setAcknowledgedPopup={setAcknowledgedPopup}
      />
      <ConfirmUpload
        open={confirmUpload}
        setOpen={setConfirmUpload}
        handleConfirm={handleConfirmUpload}
      />
      <UploadResults
        uploadResults={uploadResults}
        handleEditClick={handleEditClick}
        page={page}
        handlePageChange={handlePageChange}
        scrollRef={uploadRef}
      />
      {createdReviews !== null &&
        <div className="upload-list">
          <div className="list-status">
            Successfully uploaded {createdReviews.length} reviews &mdash; we found existing reviews for the remaining uploads
          </div>
          <Divider component="li" sx={{ mb: 2 }} />
          <div className="created-reviews">
            {createdReviews.map((createdReview, index) => (
              <div key={index}>
                < img className="media-img"
                  src={createdReview.thumbnail}>
                </img>
              </div>
            ))}
          </div>
        </div>
      }

      <SuccessAlert
        message={"Reviews successfully uploaded"}
        showAlert={isSuccess}
        setShowAlert={setIsSuccess}
      />
      <ErrorAlert
        message={"Error uploading the reviews"}
        showAlert={isError}
        setShowAlert={setIsError}
      />
    </div>
  );
}

export default UploadPage;