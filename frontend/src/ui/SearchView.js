import React, { useState } from 'react';
import leftIcon from '../images/img_interface_essential_searchloupe.svg'

const SearchView = ({ 
  placeholder = "Search", 
  onSearch, 
  className = "",
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        {/* Left Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 ">
          <img 
            src={leftIcon} 
            alt="Search" 
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
        </div>
        
        {/* Input Field */}
        <input
          type="search"
          value={searchValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pl-8 sm:pl-10 pr-3  sm:py-2.5 sm:text-sm  border border-primary rounded-[10px] focus:outline-none focus:ring-2 focus:ring-global-4 focus:border-transparent duration-200"
        />
      </div>
    </form>
  );
};


export default SearchView;