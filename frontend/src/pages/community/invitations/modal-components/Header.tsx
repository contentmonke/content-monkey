import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function Header({ setInviteOpen }: any) {
  return (
    <>
      <div className="invite-modal-header">
        <IconButton onClick={() => setInviteOpen(false)}>
          <Close />
        </IconButton>
      </div>
    </>
  );
}

export default Header;