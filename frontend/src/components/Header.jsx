import React from 'react';
import { Link } from 'react-router-dom';

const Header = ()=> {
    return (
        <header className="header">
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/upload">Upload</Link>
        </nav>
      </header>
    )
}

export default Header