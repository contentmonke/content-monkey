import { Button, ButtonGroup, ClickAwayListener, MenuItem, MenuList, Paper, Popper, Box, Modal, TextField } from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { buttonGroup } from "../../style/media-page";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import SuccessAlert from '../../components/SuccessAlert';
import ErrorAlert from '../../components/ErrorAlert';

const options = [
  "Add to my List",
]

function ActionDropdown({ isOpen, setOpen, handleClick, mediaId, userId }: any) {
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // for creating new list
  const [modalOpen, setModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [error, setError] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // State to store user's lists
  const [userLists, setUserLists] = useState([]);

  const fetchUserLists = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/user/${userId}/lists`);
      setUserLists(response.data);
    } catch (err) {
      console.error('Error fetching user lists', err);
    }
  }

  // Fetch user lists when popper opens
  useEffect(() => {
    fetchUserLists();
  }, [isOpen, userId]);

  const handleDropdown = () => {
    setOpen(!isOpen);
  };

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleCreateList = async () => {
    if (!newListName.trim()) {
      setError('List name cannot be empty');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/lists/create', null, {
        params: {
          name: newListName,
          userId: userId,
        },
      });

      setModalOpen(false);
      setNewListName('');
      setError('');
      setIsSuccess(true);

      fetchUserLists();
    } catch (err) {
      setError('Failed to create list');
      setIsError(true);
    }
  };

  const handleAddToList = async (listId: number) => {
    try {
      await axios.post(`http://localhost:8080/api/lists/${listId}/add-media`, null, {
        params: {
          mediaId: mediaId
        }
      });
      setOpen(false);
      setIsSuccess(true);
    } catch (err) {
      setError('Error adding media to list')
      setIsError(true);
    }
  };

  return (
    <>
      <ButtonGroup
        variant="outlined"
        sx={{ ...buttonGroup }}
        ref={anchorRef}
      >
        <Button
          sx={{ flexGrow: 1, borderColor: "#31628F", color: "#31628F" }}
          onClick={handleClick}
        >{options[selectedIndex]}</Button>
        <Button
          size="small"
          sx={{ borderColor: "#31628F", color: "#31628F" }}
          aria-controls={isOpen ? 'split-button-menu' : undefined}
          onClick={handleDropdown}
        >
          <ArrowDropDownIcon color={"#31628F"} />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1, width: anchorRef.current?.clientWidth }}
        open={isOpen}
        anchorEl={anchorRef.current}
        placement={'bottom-start'}
        disablePortal
      >
        <Paper sx={{ mt: 1 }}>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList id="split-button-menu" autoFocusItem>
              {/* Create New List Option */}
              <MenuItem onClick={() => setModalOpen(true)}>
                Create New List
              </MenuItem>

              {/* User's Existing Lists */}
              {userLists.map((list) => (
                <MenuItem
                  key={list.id}
                  onClick={() => handleAddToList(list.id)}
                >
                  Add to {list.name}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>

      {/* Modal for Creating a New List */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #31628F',
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className="create-list-caption">
            Create a New List
          </div>

          <TextField
            fullWidth
            variant="outlined"
            label="List Name"
            value={newListName}
            onChange={(e) => {
              setNewListName(e.target.value);
              setError(''); // Clear error on input
            }}
            error={!!error}
            sx={{
              marginBottom: '20px',
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#31628F',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#31628F',
              },
            }}
          />
          <Button
            onClick={handleCreateList}
            sx={{
              backgroundColor: '#31628F',
              color: 'white',
              '&:hover': {
                backgroundColor: '#25496A',
              },
              width: '100%'
            }}
          >
            Create
          </Button>
        </Box>
      </Modal>

      <SuccessAlert
        message={"Success!"}
        showAlert={isSuccess}
        setShowAlert={setIsSuccess}
      />
      <ErrorAlert
        message={error}
        showAlert={isError}
        setShowAlert={setIsError}
      />
    </>
  );
}

export default ActionDropdown;