import React from 'react';

interface SearchMsgInputProps {
    handleMessageSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    msgSearchInput : string;
  }
  
  const SearchMsgInput = (props:SearchMsgInputProps) => {
    return (
      <div>
      <input
          data-testid="search-name"
          className="search-input"
          placeholder="Search"
          type="text"
          name="search"
          value={props.msgSearchInput || ""}
          onChange={props.handleMessageSearch}
        />
      </div>
    );
  };
  
  export default SearchMsgInput;