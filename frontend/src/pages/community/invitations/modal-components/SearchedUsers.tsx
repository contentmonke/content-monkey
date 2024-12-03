import "../GroupInvitationsPage.css"
import SendIcon from '@mui/icons-material/Send';

const inviteButton = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  color: '#31628F',
  borderColor: '#31628F',
  width: 100,
}

function SearchedUsers({ users, sendInvite }: any) {
  return (
    <div className="invite-user-list">
      {users.map((user) => (
        <>
          <div className="invite-user-item" key={user.id}>
            <div className="user-info">
              <div className="user-img-container">
                <img
                  className={"user-img"}
                  src={user.picture || 'https://via.placeholder.com/150'}
                />
              </div>
              {user.name}
            </div>
            <div className="invite-button">
              <button
                className={'button'}
                style={{ ...inviteButton }}
                onClick={() => sendInvite(user.id)}
              >
                Invite &nbsp;
                <SendIcon />
              </button>
            </div>
          </div>
        </>
      ))
      }
    </ div>
  );
}

export default SearchedUsers;