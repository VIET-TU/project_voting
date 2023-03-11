import { Link, useNavigate } from "react-router-dom";

import "./navbar.css";
const NavBar = () => {
  let user;
  const handleDelete = () => {};
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home">
        Home
      </Link>
      <Link to="/group" className="navbar-home">
        Group
      </Link>
      {user ? (
        <>
          <p className="navbar-user">
            Hi, <span> {user.username} </span>
          </p>
          <Link to="/logout" className="navbar-logout" onClick={handleDelete}>
            Log out
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-login">
            Login
          </Link>
          <Link to="/register" className="navbar-register">
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
