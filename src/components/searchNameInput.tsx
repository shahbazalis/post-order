import React from 'react';

interface SearchInputProps {
    handleNameSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchInput : string;
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
          value={props.searchInput || ""}
          onChange={props.handleNameSearch}
        />
      </div>
    );
  };
  
  export default SearchNameInput;