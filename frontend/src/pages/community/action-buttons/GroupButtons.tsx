import Button from "../../../components/button/Button";

const inviteButtonSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  color: '#31628F',
  borderColor: '#31628F',
  width: '180px'
}

export function JoinButton({ group, userId, handleClick }: any) {
  return (
    <>
      {group.isPublic && !group.members.includes(userId) &&
        <Button
          label={"Join Group"}
          onClick={handleClick}
          width={'180px'}
        />
      }
    </>
  );
}

export function LeaveButton({ group, userId, handleClick }: any) {
  return (
    <>
      {group.members.includes(userId) &&
        <Button
          label={"Leave Group"}
          onClick={handleClick}
          width={'180px'}
        />
      }
    </>
  );
}

export function RequestButton({ group, userId, handleClick }: any) {
  return (
    <>
      {!group.isPublic && !group.members.includes(userId) && // TODO - make sure joinRequests parses correctly
        < Button
          label={group.joinRequests.includes(userId) ? "Requested" : "Request to Join"}
          onClick={handleClick}
          width={'180px'}
          disabled={group.joinRequests.includes(userId)}
        />
      }
    </>
  );
}

export function InviteButton({ group, userId, handleClick }: any) {
  return (
    <>
      {group.members.includes(userId) &&
        < button
          className={'button'}
          style={{ ...inviteButtonSx }}
          onClick={handleClick}
        >
          Invite
        </button >
      }
    </>
  );
}

export function DiscussionButton({ group, userId, handleClick, board }: any) {
  console.log( group )
  return (
    <>
      {group?.members.includes(userId) &&
        <Button
          label={board.title}
          onClick={() => handleClick(group.id, board.id)}
          width={'180px'}
        />
      }
    </>
  );
}