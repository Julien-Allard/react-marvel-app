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
        <Link to="/favourites">
          <p>Favourites</p>
        </Link>
      </nav>
    </div>
  );
};

export default Navigation;
