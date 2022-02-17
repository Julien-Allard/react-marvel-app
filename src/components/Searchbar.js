const Searchbar = ({ setSearch }) => {
  const searchItem = (value) => {
    setSearch(value);
  };

  return (
    <input
      type="texte"
      placeholder="Looking for something ?"
      onChange={(event) => {
        searchItem(event.target.value);
      }}
    />
  );
};

export default Searchbar;
