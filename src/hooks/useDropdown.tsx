import React, { useState } from 'react';

const useDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return { isDropdownOpen, setIsDropdownOpen, toggleDropdown };
};

export default useDropdown;
