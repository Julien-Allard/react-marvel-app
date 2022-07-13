import React, { ChangeEvent, Dispatch, SetStateAction, FC } from 'react';
import './searchbar.css';

interface SearchBarProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const Searchbar: FC<SearchBarProps> = ({ search, setSearch }) => {
  const searchItem = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="searchbar-container">
      <input
        type="search"
        placeholder="Lookin' for somethin', bub ?"
        onChange={searchItem}
        value={search}
      />
    </div>
  );
};

export default Searchbar;
