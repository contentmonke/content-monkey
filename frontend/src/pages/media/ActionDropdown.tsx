import { Button, ButtonGroup, ClickAwayListener, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { buttonGroup } from "../../style/media-page";
import React, { useState } from "react";

const options = [
  "Add to my List",
  "Option2",
  "Option3",
]

function ActionDropdown({ isOpen, setOpen, handleClick }: any) {
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

export default ActionDropdown;