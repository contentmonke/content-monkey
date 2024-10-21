import { uploadReviewsButton } from "../style/upload-page";
import "../pages/upload/UploadPage.css"

function CancelButton({ onClick }: any) {
  return (
    <button
      className={'button'}
      style={{ ...uploadReviewsButton, width: '150px', marginLeft: '10px', marginRight: '10px' }}
      onClick={() => onClick()}
    >
      Cancel
    </button>
  );
}

export default CancelButton;