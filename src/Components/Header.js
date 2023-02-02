import { useState } from "react";
import { Link } from "react-router-dom";

const Title = () => {
  return (
    <a href="/">
      <img
        className="logo"
        alt="Logo"
        src="https://cdn.octopix.in/uploads/company-logo/2020/11/19/food-villa-pSJVhwoN8KxgwV9jtuB1MlosJ0ejoKfiBiVO1jJPLM61shyarbxVvjIFy3DVpbUML8eBxcUo7BOWXQcd-350x350.jpg"
      />
    </a>
  );
};
const Header = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  return (
    <div className="header">
      <Title />
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>Cart</li>
        </ul>
        {isLoggedIn ? (
          <button onClick={() => setisLoggedIn(false)}>Logout</button>
        ) : (
          <button onClick={() => setisLoggedIn(true)}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Header;
