import { FC } from 'react';
import '../components/header.css';
import reactLogo from '../assets/img/react-brands.svg';
import Navigation from './Navigation';

const Header: FC = () => {
  return (
    <>
      <div className="header-container">
        <div className="banner-full">
          <div className="banner-logo">
            <h1>Mar-Veact</h1>
            <div>
              <img src={reactLogo} alt="" className="react-logo" />
            </div>
          </div>
          <p>Full Marvel / Full React</p>
        </div>
      </div>
      <Navigation />
    </>
  );
};

export default Header;
