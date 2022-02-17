import "../components/searchbar.css";

const Searchbar = ({ setSearch }) => {
  const searchItem = (value) => {
    setSearch(value);
  };

  return (
    <div className="searchbar-container">
      <input
        type="search"
        placeholder="Lookin' for somethin', bub ?"
        onChange={(event) => {
          searchItem(event.target.value);
        }}
      />
    </div>
  );
};

export default Searchbar;
