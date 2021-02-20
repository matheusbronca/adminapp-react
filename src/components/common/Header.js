import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const activeStyle = { color: '#F15B2A' };

  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {'  |  '}
      <NavLink to="/courses" activeStyle={activeStyle}>
        Courses
      </NavLink>
      {'  |  '}
      <NavLink to="/about" activeStyle={activeStyle} exact>
        About
      </NavLink>
    </nav>
  );
}
