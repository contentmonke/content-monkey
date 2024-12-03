import { Dialog, DialogTitle, SxProps, Theme } from "@mui/material";
import Header from "./modal-components/Header";
import "./InviteModal.css";
import { useState } from "react";
import SearchBar from "./modal-components/SearchBar";
import SearchedUsers from "./modal-components/SearchedUsers";
import { inviteToGroup, searchUsersByUsername } from "../community-utils";
import dayjs from "dayjs";


export const modal: SxProps<Theme> = {
  py: 5,
  px: 10,
  minWidth: 550,
  maxWidth: 1000,
  margin: 'auto',
  textAlign: 'center',
  justifyContent: 'center'
}

function InviteModal({ groupId, inviterId, open, setInviteOpen }: any) {

  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  const searchUser = () => {
    if (searchTerm === "") return;
    searchUsersByUsername(searchTerm, setUsers);
  }

  const closeModal = () => {
    setSearchTerm("");
    setUsers([])
    setInviteOpen(false);
  }

  const sendInvite = (inviteeId) => {
    const invite = {
      groupId: groupId,
      inviteeId: inviteeId,
      inviterId: inviterId,
      dateSent: dayjs()
    }
    inviteToGroup(invite);
    closeModal();
  }

  return (
    <>
      {open ?
        <Dialog
          open={open}
          onClose={() => closeModal()}
          sx={{ ...modal }}
          scroll="paper"
          fullScreen
        >
          <Header setInviteOpen={closeModal} />
          <DialogTitle mb={1}>Invite to Group</DialogTitle>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchUser={searchUser}
          />
          <SearchedUsers
            users={users}
            sendInvite={sendInvite}
          />

        </Dialog>
        :
        <></>
      }
    </>
  );
}

export default InviteModal;