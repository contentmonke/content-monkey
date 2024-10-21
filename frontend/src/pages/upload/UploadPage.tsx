import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { loadUser } from "../reviews/review-utils";
import { UploadResult } from "../../models/Models";
import { SmallLoading } from "../../components/Loading";
import { uploadFile, uploadReviews } from "./upload-utils";
import './UploadPage.css';
import '../../components/button/Button.css'
import { uploadButton, uploadReviewsButton } from "../../style/upload-page";
import UploadResults from "./UploadResults";
import UploadPopup from "./UploadPopup";
import ConfirmUpload from "./ConfirmUpload";

function UploadPage() {
  const { user } = useAuth0();
  const uploadRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<any | undefined>(undefined);
  const [uploadResults, setUploadResults] = useState<UploadResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
    uploadFile(formData, setUploadResults, setIsLoading);
  }

  const handleConfirmUpload = () => {
    uploadReviews(uploadResults, userData.id, setIsLoading);
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
      <EditResultModal

      />
      <ConfirmUpload
        open={confirmUpload}
        setOpen={setConfirmUpload}
        handleConfirm={handleConfirmUpload}
      />
      <UploadPopup
        open={uploadResults.length > 0 && acknowledgedPopup == false}
        setAcknowledgedPopup={setAcknowledgedPopup}
      />
      <UploadResults
        uploadResults={uploadResults}
        handleEditClick={handleEditClick}
        page={page}
        handlePageChange={handlePageChange}
        scrollRef={uploadRef}
      />
    </div>
  );
}

export default UploadPage;