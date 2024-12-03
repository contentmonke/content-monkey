import { Card, CardContent, Divider, Fab, SxProps, Theme } from "@mui/material";
import "./MyGroups.css"
import { longMockGroups, shortMockGroups } from "./mock-groups";
import cmLogo from '../../../assets/monkey.png';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const arrowSx: SxProps<Theme> = {
  position: 'absolute',
  color: 'white',
  backgroundColor: "#31628F",
  '&:hover': {
    bgcolor: "#295680",
  },
  top: 80
}

function MyGroups({ myGroups }: any) {
  const groupsContentRef = useRef(null);
  const navigate = useNavigate();
  // const [myGroups, setMyGroups] = useState(longMockGroups);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const handleBrowseAllClick = () => {
    navigate("/community/my-groups");
  }

  const handleCardClick = (group) => {
    navigate(`/community/group/${group.id}`);
  }

  const handleLeftArrowClick = () => {
    groupsContentRef.current.scrollBy({ left: -400, behavior: 'smooth' })
  }

  const handleRightArrowClick = () => {
    groupsContentRef.current.scrollBy({ left: 400, behavior: 'smooth' })
  }

  const checkCards = () => {
    const list = groupsContentRef.current;
    if (list) {
      const totalWidth = list.scrollWidth;
      const containerWidth = list.offsetWidth;
      const firstCardOffset = list.scrollLeft;
      const lastCardOffset = totalWidth - containerWidth;
      const isAtTheStart = firstCardOffset === 0;
      const isAtTheEnd = list.scrollLeft >= lastCardOffset;
      const isOverflowing = totalWidth > containerWidth;

      setShowLeftArrow(!isAtTheStart);
      setShowRightArrow((!isAtTheEnd && isOverflowing));
    }
  }

  useEffect(() => {
    checkCards();
  }, [])

  return (
    <>
      {myGroups !== undefined ?
        <div className={myGroups.length > 0 ? "my-groups" : "my-groups-empty"}>
          <div className="my-groups-header">
            <h5 className="my-groups-title">My Groups</h5>
            {myGroups.length > 0 && <button
              className="browse-all-button"
              onClick={handleBrowseAllClick}
            >
              Browse All
            </button>
            }
          </div>
          <Divider />
          {myGroups.length === 0 ?
            <div className="my-groups-empty-message">
              <div className="">No groups joined yet</div>
            </div>
            :
            <div className="my-groups-content">
              {showLeftArrow &&
                <Fab
                  variant="extended"
                  sx={{ ...arrowSx, left: 0, }}
                  onClick={handleLeftArrowClick}
                >
                  <ArrowBackIosIcon fontSize="medium" />
                </Fab>
              }
              <div
                className="my-groups-list"
                ref={groupsContentRef}
                onScroll={checkCards}
              >
                {myGroups.slice(0, 10).map((group, index) => (
                  <Card className="group-card" key={index}
                    variant={'outlined'}
                    sx={{
                      m: 1,
                      background: 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      }
                    }}
                    onClick={() => handleCardClick(group)}
                  >
                    <CardContent>
                      <div className="group-card-content" key={group.id}>
                        <div className="group-card-picture-container">
                          <img className="group-card-picture" src={group.picture ? group.picture : 'https://via.placeholder.com/150'} />
                        </div>
                        <div className="group-card-name">{group.groupName}</div>
                        <div className="group-card-members">
                          {group.members.length} members
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {showRightArrow &&
                <Fab
                  variant="extended"
                  sx={{ ...arrowSx, right: 0 }}
                  onClick={handleRightArrowClick}
                >
                  <ArrowForwardIosIcon fontSize="medium" />
                </Fab>
              }
            </div>
          }
        </div>
        :
        <></>
      }
    </>
  );
}

export default MyGroups;