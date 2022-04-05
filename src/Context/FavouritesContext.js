import React from "react";
import { createContext, useState } from "react";

export const FavouritesContext = createContext();

export const FavouritesProvider = (props) => {
  const [favChars, setFavChars] = useState(localStorage.getItem("favchars"));
  const [favComics, setFavComics] = useState(localStorage.getItem("favcomics"));

  return (
    <FavouritesContext.Provider
      value={{ favChars, setFavChars, favComics, setFavComics }}
    >
      {props.children}
    </FavouritesContext.Provider>
  );
};
