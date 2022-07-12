import React, { ChangeEvent, Dispatch, SetStateAction, FC } from 'react';
import '../components/searchbar.css';

interface SearchBarProps {
  setSearch: Dispatch<SetStateAction<string>>;
}

const Searchbar: FC<SearchBarProps> = ({ setSearch }) => {
  const searchItem = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="searchbar-container">
      <input
        type="search"
        placeholder="Lookin' for somethin', bub ?"
        onChange={searchItem}
      />
    </div>
  );
};

export default Searchbar;
