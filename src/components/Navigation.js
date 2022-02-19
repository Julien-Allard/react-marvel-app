import { Link } from "react-router-dom";
import "../components/navigation.css";

const Navigation = () => {
  return (
    <div className="navigation-container">
      <nav>
        <Link to="/">
          <p>Characters</p>
        </Link>
        <span>|</span>
        <Link to="/comics">
          <p>Comics</p>
        </Link>
        <span>|</span>
        <Link to="/favourites/characters">
          <p>Favourite characters</p>
        </Link>
        <span>|</span>
        <Link to="/favourites/comics">
          <p>Favourite comics</p>
        </Link>
      </nav>
    </div>
  );
};

export default Navigation;
