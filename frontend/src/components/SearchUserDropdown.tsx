import React, { useState } from 'react';

interface DropdownProps {
  onSelectChange: (selectedOption: string) => void;
}

const SearchUserDropdown: React.FC<DropdownProps> = ({ onSelectChange }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSelectChange(value);
  };

  return (
    <div>
      <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
        <option value="email">Email</option>
        <option value="id">ID</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
};

export default SearchUserDropdown;