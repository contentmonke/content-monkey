import { Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { buttonGroup } from "../../style/media-page";
import React, { useState } from "react";
import { color } from "three/webgpu";

const options = [
  "Watched",
  "In Progress",
  "Not Started",
]

function StatusDropdown({ isOpen, setOpen, handleClick }: any) {

  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
          onClick={handleClick}
        >{options[selectedIndex]}</Button>
        <Button
          size="small"
          sx={{ bgcolor: "#31628F" }}
          aria-controls={isOpen ? 'split-button-menu' : undefined}
          onClick={handleDropdown}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup >
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