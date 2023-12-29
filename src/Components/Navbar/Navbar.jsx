import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import useFirebase from "../../hooks/useFirebase";
import { Button } from "flowbite-react";

// // Navbar.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import "./Navbar.css"

// function Navbar() {
//   return (
//     <nav className='navbar'>
//       <ul className='nav-list'>
//         <li className='nav-item'>
//           <Link className="nav-link" to="/blogs">Home</Link>
//         </li>
//         <li className='nav-item'>
//           <Link to="/profile" className="nav-link" >Profile</Link>
//         </li>
//         <li className='nav-item'>
//           <Link to="/signin" className="nav-link" >Sign In</Link>
//         </li>
//         <li className='nav-item'>
//           <Link to="/signup" className="nav-link" >Sign Up</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;
// Navbar.jsx;

function Navbar() {
  const { isVerified, signOut } = useFirebase();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    try {
      await signOut();
      toast("Successfully logged out!");
      navigate("/intro");
    } catch (error) {
      toast("Unable to logout");
    }
    setIsLoading(false);
  }, []);

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item left">
          <b to="/profile" className="nav-link campus-connect">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; Campus-Connect
          </b>
        </li>
        <li className="nav-item right">
          <Link className="nav-link" to="/blogs">
            Home
          </Link>
        </li>
        <li className="nav-item right">
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li>
        <li className="nav-item right">
          <Link to="/signin" className="nav-link">
            Sign In
          </Link>
        </li>
        <li className="nav-item right">
          <Link to="/signup" className="nav-link">
            Sign Up
          </Link>
        </li>
        {isVerified ? (
          <button onClick={handleLogout} disabled={isLoading}>
            Logout
          </button>
        ) : null}
      </ul>
    </nav>
  );
}

export default Navbar;
