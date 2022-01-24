import React from 'react';

interface SearchInputProps {
    handleNameSearch: () => void;
  }
  
  const SearchNameInput = (props:SearchInputProps) => {
    return (
      <div>
      <input
          data-testid="search-name"
          className="search-input"
          placeholder="Search"
          type="text"
          name="search"
          value=""
          onChange={props.handleNameSearch}
        />
      </div>
    );
  };
  
  export default SearchNameInput;