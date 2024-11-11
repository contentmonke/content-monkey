import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface DropdownProps {
  onSelectChange: (selectedOption: string) => void;
}

const SearchUserDropdown: React.FC<DropdownProps> = ({ onSelectChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>('username');

  const handleSelectChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSelectChange(value);
  };

  return (
    <FormControl
      sx={{
        mt: 1,
        mb: 1,
        minWidth: '100%',
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: '#31628F', // Custom focus color
          },
        },
      }}
      size="small" // Reduces the overall size of the dropdown
    >
      <Select
        value={selectedOption}
        onChange={handleSelectChange}
        input={<OutlinedInput />}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Select search type' }}
      >
        <MenuItem value="username">Username</MenuItem>
        <MenuItem value="id">ID</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SearchUserDropdown;