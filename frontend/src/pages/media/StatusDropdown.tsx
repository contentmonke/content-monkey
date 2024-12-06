import { Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Updated import for ArrowDropDownIcon
import { buttonGroup } from "../../style/media-page";
import React, { useState, useEffect } from "react";

const options = [
  "Not Started",
  "In Progress",
  "Finished",
];

function StatusDropdown({ isOpen, setOpen, handleClick, defaultStatus }: any) {
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(() =>
      options.indexOf(defaultStatus) !== -1 ? options.indexOf(defaultStatus) : 0
    );


  useEffect(() => {
      if (defaultStatus) {
        const index = options.indexOf(defaultStatus);
        if (index !== -1) {
          setSelectedIndex(index);
        }
      }
    }, [defaultStatus]);

  const handleDropdown = () => {
    setOpen(!isOpen);
  };

  const handleMenuItemClick = (index: number) => {
      setSelectedIndex(index);
      handleClick(options[index]);
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

  return (
    <>
      <ButtonGroup
        className="media-button-group"
        variant="contained"
        sx={{ ...buttonGroup }}
        ref={anchorRef}
      >
        <Button
          sx={{ flexGrow: 1, bgcolor: "#31628F" }}
          onClick={() => handleClick(options[selectedIndex])} // Pass the current status when clicked
        >
          {options[selectedIndex]}
        </Button>
        <Button
          size="small"
          sx={{ bgcolor: "#31628F" }}
          aria-controls={isOpen ? 'split-button-menu' : undefined}
          onClick={handleDropdown}
        >
          <ArrowDropDownIcon />
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
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={() => handleMenuItemClick(index)}
                  sx={{
                    bgcolor: index === selectedIndex ? '#d5e5f3' : 'inherit',
                    '&.Mui-selected': { bgcolor: '#d5e5f3' },
                    '&.Mui-selected:hover': { bgcolor: '#d5e5f3' },
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
}

export default StatusDropdown;
